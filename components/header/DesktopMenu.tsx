import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "../ui/navigation-menu";
import { link } from './MenuBar';
import { cn } from "@/lib/utils";

/**
 * ListItem used to render the sub tabs in the navigation menu
 * ex: Overview, Stats, Quiz in the Verbal tab
 */
const ListItem = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-slate-200"
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug font-light">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

/**
 * Used to render the main tabs in the navigation menu:
 * ex: Verbal, Quantitative, Dashboard
 */
const DesktopMenuTab = ({ link }: { link: link }) => {
  return (
    <NavigationMenuItem className="text-black font-tabs text-lg" key={link.id}>
      <NavigationMenuTrigger key={link.id}>{link.name}</NavigationMenuTrigger>
      <NavigationMenuContent className="text-black font-tabs text-md">
        <ul className="grid gap-2 p-5 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-5 min-h-[420px]">
            <NavigationMenuLink asChild>
              <Link
                className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href={link.href}
              >
                <h1 className="font-chalk text-8xl justify-center h-[200px] flex items-center">{link.name.substring(0, 1)}</h1>
                <div className="mb-2 mt-4 text-lg font-medium">{link.name}</div>
                <p className="text-sm leading-tight text-muted-foreground">
                  {link.description}
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          {link.tabs!.map((subTab) => {
            return (
              <ListItem
                title={subTab.name}
                href={link.href+"?tab="+subTab.query}
                key={link.id+":subTab "+subTab.id}
                description={subTab.description}
              />
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

/**
 * Used to render the navigation menu for desktop.
 * Contains all the nav tabs and the account dropdown
 */
const DesktopMenu = ({
  links
}: {
  links: link[];
}) => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => (
            <DesktopMenuTab key={link.id + ":" + link.name} link={link} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>      
    </>
  );
};

export default DesktopMenu;
