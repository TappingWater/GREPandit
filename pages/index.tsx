import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = () => {
	const { authStatus } = useAuthenticator((context) => [context.authStatus]);
	const Router = useRouter();
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		if (authStatus === "authenticated") {
			Router.replace("/dashboard?tab=home");
		} else {
			setIsCheckingAuth(false);
		}
	}, [authStatus, Router]);

	if (isCheckingAuth) {
		return null; // or return a loading spinner
	}

	const heroBanner = () => {
		const heroSubTextStyling = "font-light";
		const buttonStyling =
			"bg-sky-700 p-4 font-semibold rounded-lg font-tabs mr-2 mt-2 mb-2 drop-shadow-2xl hover:bg-sky-500 active:bg-sky-200 active:shadow-inner transition-all";
		return (
			<div className='flex flex-col-reverse md:flex-row h-[100%]'>
				<div className='relative h-[60vh] c md:mt-[5%] w-[80%] md:w-[60%] ml-5 m-auto'>
					<Image
						className='object-scale-down w-full h-full object-bottom z-10'
						src='/heroBanner.webp'
						alt='Logo'
						fill
						priority
					/>
				</div>
				<div className='ml-[10px] md:ml-[0px] pt-[10px] mb-[5px] md:pt-[20vh] sm:h-[40%] pl-[10px] md:h-[100%] md:w-[50%]'>
					<h1 className='font-heading  font-bold text-xl text-pink-200'>
						Struggling with Verbal Reasoning?
					</h1>
					<p className={heroSubTextStyling}>
						Get problems similar to the exam
					</p>
					<p className={heroSubTextStyling}>
						Platform adapts based on your performance
					</p>
					<p className={heroSubTextStyling}>Monitor and visualize your progress</p>
					<div className='flex flex-row'>
						<Link href='/login' className={buttonStyling}>
							Sign Up For Free
						</Link>
					</div>
				</div>
			</div>
		);
	};

	if (authStatus != "authenticated") {
		return <>{heroBanner()}</>;
	}
};

export default Home;
