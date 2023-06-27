import { useAuthenticator } from "@aws-amplify/ui-react";
import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";
import { useEffect } from "react";
import { createUser } from "@/lib/api/userRequests";

const Header = () => {
	const { user, authStatus } = useAuthenticator((context) => [
		context.user,
		context.route,
	]);

	const renderAuthButtons = () => {
		if (authStatus === "authenticated") {
			return <AuthHeader email={user.attributes!.email} />;
		} else if (authStatus === "configuring") {
			return <NonAuthHeader loadLogin={false} />;
		} else {
			return <NonAuthHeader loadLogin={true} />;
		}
	};

	return <>{renderAuthButtons()}</>;
};

export default Header;
