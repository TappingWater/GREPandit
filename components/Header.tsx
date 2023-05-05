import Link from "next/link";
import Logo from "./Logo";
import { useAuthenticator } from "@aws-amplify/ui-react";
import router from "next/router";
import { Auth } from "aws-amplify";
import { motion, useCycle } from "framer-motion";
import dynamic from "next/dynamic";
const HamburgerMenu = dynamic(() => import("./HamburgerMenu"));
const MenuTabs = dynamic(() => import("./MenuTabs"));

const Header = () => {
  const buttonStyling =
    "min-w-[80px] bg-sky-700 p-2 rounded-lg font-tabs ml-auto drop-shadow-2xl hover:bg-sky-500 active:bg-sky-200 active:shadow-inner transition-all";
  const { user, authStatus } = useAuthenticator((context) => [
    context.user,
    context.route,
  ]);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const nonAuthenticatedTabs = () => {
    return (
      <div className="ml-auto pr-10">
        <Link href="/login">
          <button className={buttonStyling}>Login</button>
        </Link>
      </div>
    );
  };

  const getUsernameFromEmail = (email: string) => {
    const regex = /^([^@]+)@[^@]+$/;
    const match = email.match(regex);
    if (match) {
      return match[1];
    }
    return email;
  };

  // Tailwind styling for rendering
  const headerStyling: string =
    "fixed w-[100%] h-[90px] pt-3 pb-3 flex items-center bg-white z-20 border-b-[2px] border-solid border-pink-100";
  const logoDivStyling: string = "flex-1 flex items-center";
  const desktopMenuStyling: string =
    "hidden md:flex flex-1 flex-row items-baseline gap-x-10 justify-end mr-5 mt-10";
  const mobileHamburgerIconStyling: string =
    "relative flex flex-row first-letter:flex-1 justify-end items-center md:hidden";
  const mobileSideBarStyling: string =
    "sm:flex flex-col fixed bg-white ml-[calc(100vw-130px)] mt-[90px] w-[130px] h-[100vh] pt-2 pb-2 pl-2 space-y-5 z-50 md:hidden";

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
      <header className={headerStyling}>
        <Logo className={logoDivStyling} />
        <div className={desktopMenuStyling}>
          <MenuTabs useDesktop={true} />
        </div>
        <div className={mobileHamburgerIconStyling}>
          <HamburgerMenu toggle={() => toggleOpen()}></HamburgerMenu>
        </div>
      </header>
      {/* Render mobile menu as sidebar if needed */}
      <motion.div variants={sidebarVariants} className={mobileSideBarStyling}>
        <MenuTabs useDesktop={false} />
      </motion.div>
    </motion.div>
  );
};

export default Header;
