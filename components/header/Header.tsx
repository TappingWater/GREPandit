import { useAuthenticator } from "@aws-amplify/ui-react";
import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";

const Header = () => {
  const { user, authStatus } = useAuthenticator((context) => [
    context.user,
    context.route,
  ]);

  return (
    <>
      {authStatus === "authenticated" ? (
        <AuthHeader email={user.attributes!.email} />
      ) : (
        <NonAuthHeader />
      )}
    </>
  );
};

export default Header;
