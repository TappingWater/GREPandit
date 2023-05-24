// Main links for navigation bar

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

// ex: Dashboard, Verbal, Account
export type link = {
  href: string;
  name: string;
  id: number;
  description?: string;
  tabs?: subTab[];
};

// Sub tabs type within main links in the navigation bar
// ex: Overview and Stats in Dashboard
export type subTab = {
  name: string;
  description: string;
  query: string;
  id: number;
}

/**
 * Render the navigation bar for both the mobile and desktop versions
 */
const MenuTabs = ({useDesktop, signOut}:{useDesktop:boolean, signOut:  ()=>void}) => {  
  // Define dashboard tab for nav bar
  const dashboardOverview: subTab = {
    name: "Overview",
    id: 1,
    description: "Summary of the GRE exam as a whole and general tips for exam takers",
    query: "overview"
  }
  const dashboardStats: subTab = {
    name: "Stats",
    id: 2,
    description: "Summary of the user's statistics over attempted problems over all sections",
    query: "stats"
  }
  const dashboardLink: link = {
    href: "/",
    name: "Dashboard",
    id: 1,
    tabs: [dashboardOverview, dashboardStats],
    description: "Summary of the GRE exam and cumulative stats for the platform user across all attempted problems using the platform"
  }

  // Define verbal tab for the nav bar
  const verbalOverview: subTab = {
    name: "Overview",
    id: 1,
    description: "Summary and tips for improving in the verbal section of the GRE exam.",
    query: "overview"
  }
  const verbalStats: subTab = {
    name: "Stats",
    id: 2,
    description: "Summary of the User's statistics over attempted verbal problems",
    query: "stats"
  }
  const verbalQuiz: subTab = {
    name: "Quiz",
    id: 3,
    description: "Tackle problems related to the verbal section of the GRE exam",
    query: "quiz"
  }
  const verbalWords: subTab = {
    name: "Vocabulary",
    id: 4,
    description: "List of words that user had difficulty with and words highlighted by the user",
    query: "quiz"
  }
  const verbalMistakes: subTab = {
    name: "Mistakes",
    id: 5,
    description: "List of problems the user answered incorrectly for review purposes",
    query: "mistakes"
  }
  const verbalLink: link = {
    href: "/verbal",
    name: "Verbal",
    id: 2,
    tabs: [verbalQuiz, verbalOverview, verbalStats, verbalMistakes, verbalWords],
    description: "Designed to assist test takers with the tools to improve their strengths and analyze their weakness's for the verbal section"
  };
  
  // Define quantitative tab for the nav bar
  const quantOverview: subTab = {
    name: "Overview",
    id: 1,
    description: "Summary and tips for improving in the verbal section of the GRE exam",
    query: "overview"
  }
  const quantStats: subTab = {
    name: "Stats",
    id: 2,
    description: "Summary of the User's statistics over attempted quantitative problems",
    query: "stats"
  }
  const quantQuiz: subTab = {
    name: "Quiz",
    id: 3,
    description: "Tackle problems related to the quantitative section of the GRE exam",
    query: "quiz"
  }
  const quantMistakes: subTab = {
    name: "Mistakes",
    id: 4,
    description: "List of problems the user answered incorrectly for review purposes",
    query: "mistakes"
  }
  const quantitativeLink: link = {
    href: "/quantitative",
    name: "Quantitative",
    id: 3,
    tabs: [quantQuiz, quantOverview, quantStats, quantMistakes],
    description: "Designed to assist test takers with the tools to improve their strengths and analyze their weakness's for the verbal section"
  };

  // Define analytical writing tab for the nav bar
  const writingOverview: subTab = {
    name: "Overview",
    id: 1,
    description: "Summary and tips for improving in the analytical writing section of the exam",
    query: "overview"
  }
  const writingStats: subTab = {
    name: "Stats",
    id: 2,
    description: "Summary of the User's statistics over attempted analytical writing problems",
    query: "stats"
  }
  const writingQuiz: subTab = {
    name: "Write",
    id: 3,
    description: "Write an essay for a prompt given by the platform and have it critiqued and graded",
    query: "quiz"
  }
  const writingSubmissions: subTab = {
    name: "Submissions",
    id: 4,
    description: "List of user's previous submissions in the platform for review purposes",
    query: "submissions"
  }
  const writingLink = {
    href: "/writing",
    name: "Analytical Writing",
    id: 3,
    tabs: [writingQuiz, writingOverview, writingStats, writingSubmissions],
    description: "Designed to assist test takers with the tools to improve their strengths and analyze their weakness's for the verbal section"
  };

  // Define help tab for the nav bar
  const helpContact: subTab = {
    name: "Contact Us",
    id: 1,
    description: "Feel free to contact us if you have any inquiries or issues. We're here to help",
    query: "contact"
  }
  const helpForum: subTab = {
    name: "Forum",
    id: 2,
    description: "Public forum for platform user's to communicate with each other",
    query: "forum"
  }
  const helpIssues: subTab = {
    name: "Reported Issues",
    id: 3,
    description: "List of ongoing and resolved issues reported by the user",
    query: "quiz"
  }
  const helpLink: link = {
    href: "/help",
    name: "Help",
    id: 5,
    tabs: [helpContact, helpForum, helpIssues],
    description: "List of links to help the user resolve and discuss issues"
  };

  // Define the links used for the account tab for the user
  const accountLink: link = {
    href: "/account",
    name: "Account",
    id: 6
  }
  const billingLink: link = {
    href: "/billing",
    name: "Billing",
    id: 7
  }
  
  // Menu with the sub tabs for the header and profile
  const headerMenu: link[] = [
    dashboardLink,
    verbalLink,
    quantitativeLink,
    writingLink,
    helpLink,
  ];
  const profileMenu: link[] = [
    accountLink,
    billingLink
  ];

  // Render tabs to be used for desktop and mobile menu
  return (
    <>
      {useDesktop? 
        <DesktopMenu links={headerMenu}></DesktopMenu>:
        <MobileMenu links={headerMenu} accountLinks={profileMenu} logOut={signOut}></MobileMenu>
      }
    </>
  );
};

export default MenuTabs;
