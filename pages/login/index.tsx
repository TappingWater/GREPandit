import { useEffect } from "react";
import { useRouter } from "next/router";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { createUser } from "@/lib/api/userRequests";

const Login = () => {
	const router = useRouter();
	const { authStatus } = useAuthenticator((context) => [context.route]);

	useEffect(() => {
		if (authStatus == "authenticated") {
			router.replace("/");
		}
	}, [authStatus, router]);

	useEffect(() => {
		if (authStatus === "authenticated") {
			createUser().catch((err) => {
				console.error("Error creating user:", err);
			});
		}
	}, [authStatus]);

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
