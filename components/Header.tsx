import Link from "next/link";
import Logo from "./Logo";
import { useAuthenticator } from "@aws-amplify/ui-react";
import router from "next/router";
import { Auth } from "aws-amplify";

const Header = () => {
  const buttonStyling =
    "min-w-[80px] bg-sky-700 p-2 rounded-lg font-tabs ml-auto drop-shadow-2xl hover:bg-sky-500 active:bg-sky-200 active:shadow-inner transition-all";
  const { user, authStatus } = useAuthenticator((context) => [
    context.user, context.route
  ]);

	const handleSignOut = async () => {
    try {
      await Auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
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
	}

	const authenticatedTabs = () => {
		console.log(user);
		return (
			<div className="ml-auto pr-10">
					<p>Hi, {getUsernameFromEmail(user.attributes?.email!)}</p>
          <button className={buttonStyling} onClick={handleSignOut}>Sign Out</button>        
			</div>
		);
	};

  return (
    <div className="flex flex-row h-[15vh] items-center border-solid border-pink-100 border-b-[0.5px]">
      <Logo className="w-[60%] ml-10"></Logo>
      {authStatus !== "authenticated" ? nonAuthenticatedTabs(): authenticatedTabs()}
    </div>
  );
};

export default Header;
