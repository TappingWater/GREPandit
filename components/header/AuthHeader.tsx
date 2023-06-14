import Logo from "./Logo";
import router from "next/router";
import { Auth } from "aws-amplify";
import { motion, useCycle } from "framer-motion";
import dynamic from "next/dynamic";
import ProfileDropDown from "./ProfileDropDown";
const HamburgerMenu = dynamic(() => import("./HamburgerMenu"));
const MenuBar = dynamic(() => import("./MenuBar"));

/**
 * Header component rendered at the top of the page when the user
 * is authenticated
 */
const AuthHeader = ({ email }: { email: string }) => {
	const handleSignOut = async () => {
		try {
			await Auth.signOut();
			router.push("/");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	// Tailwind styling for rendering
	const buttonStyling =
		"min-w-[80px] bg-sky-700 p-2 rounded-lg font-tabs ml-auto drop-shadow-2xl hover:bg-sky-500 active:bg-sky-200 active:shadow-inner transition-all";
	const logoDivStyling: string = "w-[250px] flex items-center";
	const desktopMenuStyling: string =
		"hidden md:flex flex-row items-baseline gap-x-10 justify-end mr-5";
	const mobileHamburgerIconStyling: string =
		"ml-auto relative flex flex-row first-letter:flex-1 justify-end items-center md:hidden";
	const mobileSideBarStyling: string =
		"sm:flex flex-col overflow-auto fixed bg-white ml-[calc(100vw-130px)] mt-[90px] w-[130px] h-[100vh] pt-2 pb-2 pl-2 space-y-5 z-50 md:hidden";

	// Use state to determine whether to use desktop or mobile menu
	const [isOpen, toggleOpen] = useCycle(false, true);

	// Framer motion variants for sidebar animation
	// Variants for sidebar
	const sidebarVariants = {
		open: {
			x: "0%",
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 40,
				staggerChildren: 0.07,
				delayChildren: 0.15,
			},
		},
		closed: {
			x: "100%",
			transition: {
				delay: 0.5,
				type: "spring",
				stiffness: 400,
				damping: 40,
				staggerChildren: 0.05,
				staggerDirection: -1,
				bounce: 0,
			},
		},
	};

	// Render header component and sidebar if needed
	return (
		<motion.div initial={false} animate={isOpen ? "open" : "closed"}>
			<header className='fixed w-[100%] h-[90px] pt-3 pb-3 flex items-center bg-white z-20 border-solid border-pink-300 border-b-2'>
				<Logo className={logoDivStyling} />
				<div className={desktopMenuStyling}>
					<MenuBar useDesktop={true} signOut={handleSignOut} />
				</div>
				<div className='hidden md:flex ml-auto mr-5 font-tabs'>
					<ProfileDropDown
						email={email}
						logOut={handleSignOut}
					></ProfileDropDown>
				</div>
				<div className={mobileHamburgerIconStyling}>
					<HamburgerMenu toggle={() => toggleOpen()}></HamburgerMenu>
				</div>
			</header>
			{/* Render mobile menu as sidebar if needed */}
			<motion.div
				variants={sidebarVariants}
				className={mobileSideBarStyling}
			>
				<MenuBar useDesktop={false} signOut={handleSignOut} />
			</motion.div>
		</motion.div>
	);
};

export default AuthHeader;
