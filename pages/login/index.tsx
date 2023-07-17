import { useEffect } from "react";
import { useRouter } from "next/router";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

const Login = () => {
	const router = useRouter();
	const { authStatus } = useAuthenticator((context) => [context.route]);

	useEffect(() => {
		if (authStatus == "authenticated") {
			router.replace("/dashboard?tab=home");
		}
	}, [authStatus, router]);

	return (
		<div className='pt-10'>
			<Authenticator
				initialState='signIn'
				loginMechanisms={["email"]}
				signUpAttributes={["email"]}
				socialProviders={["google"]}
			></Authenticator>
		</div>
	);
};

export default Login;
