import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { link } from "./MenuBar";
import Link from "next/link";
import { motion } from "framer-motion";
import IconTab from "../ui/IconTab";

//Framer motion variants for tab animations
const mobileTabVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: 200,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

/**
 * Render a single main tab for the mobile menu as an accordion
 * component with option to drop down for subtab links
 */
const MobileMenuTab = ({ link }: { link: link }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="text-black bg-white text-sm w-[100%] pl-2 pr-2"
    >
      <AccordionItem value={link.id + ":" + link.name}>
        <AccordionTrigger className="no-underline w-[100%] text-left">
          {link.name}
        </AccordionTrigger>
        {link.tabs!.map((subTab) => {
          return (
            <Link href={link.href} key={link.name + ":subTab" + subTab.id}>
              <AccordionContent className="w-[100%] text-left pl-2 font-light active:text-white active:bg-black transition-all">
                {subTab.name}
              </AccordionContent>
            </Link>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
};

/**
 * Render the account drop down for the mobile menu with the profile and
 * billing tabs
 */
const AccountDropDown = (links: link[]) => {
  return (
    <motion.button
      className="text-md font-tabs w-full flex justify-start"
      variants={mobileTabVariants}
      whileTap={{ scale: 0.85 }}
      key="account-drop"
    >
      <Accordion
        type="single"
        collapsible
        className="text-black bg-white text-sm w-[100%] pl-2 pr-2"
      >
        <AccordionItem value="profile-dropdown">
          <AccordionTrigger className="no-underline w-[100%] text-left">
            Account
          </AccordionTrigger>
          {links.map((link) => {
            return (
              <Link href={link.href} key={link.name + link.id}>
                <AccordionContent className="w-[100%] text-left pl-2 font-light active:text-white active:bg-black transition-all">
                  {link.name}
                </AccordionContent>
              </Link>
            );
          })}
        </AccordionItem>
      </Accordion>
    </motion.button>
  );
};

/**
 * Render the mobile menu for the app
 */
const MobileMenu = ({
  links,
  accountLinks,
  logOut
}: {
  links: link[];
  accountLinks: link[];
  logOut: () => void;
}) => {
  return (
    <>
      {links.map((link) => {
        return (
          <motion.button
            className="text-md font-tabs w-full flex justify-start"
            variants={mobileTabVariants}
            whileTap={{ scale: 0.85 }}
            key={link.id}
          >
            <MobileMenuTab link={link}></MobileMenuTab>
          </motion.button>
        );
      })}
      {AccountDropDown(accountLinks)}
      <motion.button
        variants={mobileTabVariants}
        whileTap={{ scale: 0.85 }}
        onClick={logOut}
        className="h-[30px] w-[85%] bg-slate-800 text-white rounded font-tabs text-sm"
      >
        <IconTab img="/icons/logout.svg" name="Log Out"></IconTab>
      </motion.button>
    </>
  );
};

export default MobileMenu;
