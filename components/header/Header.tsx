import { useAuthenticator } from "@aws-amplify/ui-react";
import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";

const Header = () => {
	const { user, authStatus, isPending } = useAuthenticator((context) => [
		context.user,
		context.authStatus,
		context.isPending,
	]);

	const renderAuthButtons = () => {
		if (authStatus === "authenticated") {
			return <AuthHeader email={user.attributes!.email} />;
		} else if (isPending) {
			return <NonAuthHeader loadLogin={false} />;
		} else {
			return <NonAuthHeader loadLogin={true} />;
		}
	};

	return <>{renderAuthButtons()}</>;
};

export default Header;
