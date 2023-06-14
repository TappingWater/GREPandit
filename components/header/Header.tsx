import { useAuthenticator } from "@aws-amplify/ui-react";
import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";

const Header = () => {
	const { user, authStatus } = useAuthenticator((context) => [
		context.user,
		context.route,
	]);

	const renderAuthButtons = () => {
		console.log(user);

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
