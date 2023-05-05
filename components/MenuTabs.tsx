import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Render tabs for menu function
const MenuTabs: React.FC<{ useDesktop: boolean }> = (props) => {
  // Render links for mobile and desktop menu
  type link = {
    href: string;
    name: string;
    id: number;
  };

  //Framer motion variants for tab animations
  // Variants for mobile tabs
  const mobileTabVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  // Define link objects for navigation and rendering
  const homeLink = { href: "/", name: "Dashboard", id: 1 };
  const verbalLink = { href: "/verbal", name: "Verbal", id: 2 };
  const quantitativeLink = { href: "/quantitative", name: "Quantitative", id: 3 };
  const writingLink = { href: "/writing", name: "Writing", id: 4 };
	const accountLink = { href: "/account", name: "Account", id: 5 };
  const headerMenu: link[] = [homeLink, verbalLink, quantitativeLink, writingLink, accountLink];

  // Tailwind styling
  const commonTabsStyles: string =
    "text-black hover:bg-slate-800 hover:text-white active:bg-slate-600 p-2 rounded transition-all font-tabs";
  const desktopMenuTabStyling: string = `${commonTabsStyles}`;
  const mobileMenuTabStyling: string = `${commonTabsStyles} w-[85%] text-left`;
  const activeStyling: string = " font-semibold text-pink-400";

  const pathname = usePathname();

  // Render tabs to be used for desktop and mobile menu
  return (
    <>
      {headerMenu.map((link) => {
        return (
          <Link
            href={link.href}
            key={props.useDesktop ? link.id : link.id + "a"}
          >
            <motion.button
              className={(props.useDesktop
                ? desktopMenuTabStyling
                : mobileMenuTabStyling
              ).concat(pathname === link.href ? activeStyling : "")}
              variants={props.useDesktop ? {} : mobileTabVariants}
              whileTap={{ scale: 0.85 }}
              key={props.useDesktop ? link.id + "b" : link.id + "c"}
            >
              {link.name}
            </motion.button>
          </Link>
        );
      })}
    </>
  );
};

export default MenuTabs;