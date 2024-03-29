import Link from "next/link";
// import {
// 	NavigationMenu,
// 	NavigationMenuList,
// 	NavigationMenuContent,
// 	NavigationMenuItem,
// 	NavigationMenuLink,
// 	NavigationMenuTrigger,
// } from "../ui/navigation-menu";
import { MenuTab, SubTab } from "./MenuBar";
import router, { useRouter } from "next/router";
// import { cn } from "@/lib/utils";

// /**
//  * ListItem used to render the sub tabs in the navigation menu
//  * ex: Overview, Stats, Quiz in the Verbal tab
//  */
// const ListItem = ({
//   title,
//   description,
//   href,
// }: {
//   title: string;
//   description: string;
//   href: string;
// }) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <Link
//           href={href}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-slate-200"
//           )}
//         >
//           <div className="text-sm font-medium leading-none font-heading">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug font-light">
//             {description}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// };

// /**
//  * Used to render the main tabs in the navigation menu:
//  * ex: Verbal, Quantitative, Dashboard
//  */
// const DesktopMenuTab = ({ link }: { link: MenuTab }) => {
//   return (
//     <NavigationMenuItem className="text-black font-text text-lg" key={link.id}>
//       <NavigationMenuTrigger className="font-tabs text-semibold" key={link.id}>{link.name}</NavigationMenuTrigger>
//       <NavigationMenuContent className="text-black text-md">
//         <ul className="grid gap-2 p-5 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//           <li className="row-span-5 min-h-[420px]">
//             <NavigationMenuLink asChild>
//               <Link
//                 className="flex h-full w-full select-none flex-col rounded-md bg-slate-200 p-6 no-underline outline-none focus:shadow-md"
//                 href={link.href}
//               >
//                 <h1 className="font-chalk text-8xl justify-center h-[200px] flex items-center">{link.name.substring(0, 1)}</h1>
//                 <div className="font-heading mb-2 mt-4 text-lg font-medium">{link.name}</div>
//                 <p className="text-sm leading-tight text-muted-foreground">
//                   {link.description}
//                 </p>
//               </Link>
//             </NavigationMenuLink>
//           </li>
//           {link.tabs!.map((subTab) => {
//             return (
//               <ListItem
//                 title={subTab.name}
//                 href={link.href+"?tab="+subTab.query}
//                 key={link.id+":subTab "+subTab.id}
//                 description={subTab.description}
//               />
//             );
//           })}
//         </ul>
//       </NavigationMenuContent>
//     </NavigationMenuItem>
//   );
// };

const displayHoverLink = (
	subLink: SubTab,
	link: MenuTab,
	tab: string | string[] | undefined
) => {
	return (
		<Link
			href={link.href + "?tab=" + subLink.query}
			key={link.name + ":subTab" + subLink.id}
			className={`font-tabs text-slate-900 hover:underline ${
				tab == subLink.query ? "font-semibold" : ""
			}`}
		>
			{subLink.name}
		</Link>
	);
};

/**
 * Used to render the navigation menu for desktop.
 * Contains all the nav tabs and the account dropdown
 */
const DesktopMenu = ({ links }: { links: MenuTab[] }) => {
	const router = useRouter();
	let { tab } = router.query;
	return (
		<div className='flex flex-row justify-evenly w-[50%] font-tabs'>
			{links.map((link) =>
				link.tabs
					? link.tabs.map((subLink) =>
							displayHoverLink(subLink, link, tab)
					  )
					: ""
			)}
		</div>
	);
};

export default DesktopMenu;
