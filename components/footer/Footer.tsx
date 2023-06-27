import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
	// Define footer links for rendering
	// type footerLink = {
	// 	icon: string;
	// 	name: string;
	// 	href: string;
	// 	id: number;
	// };
	// const mediumLink = {
	// 	icon: "/icons/medium-icon.svg",
	// 	name: "Medium",
	// 	href: "https://medium.com/@chanakap845",
	// 	id: 1,
	// };
	// const linkedInLink = {
	// 	icon: "/icons/linkedin-icon.svg",
	// 	name: "LinkedIn",
	// 	href: "https://www.linkedin.com/in/chanaka123",
	// 	id: 2,
	// };
	// const githubLink = {
	// 	icon: "/icons/github-icon.svg",
	// 	name: "Github",
	// 	href: "https://github.com/TappingWater",
	// 	id: 3,
	// };
	// const resumeLink = {
	// 	icon: "/icons/resume.svg",
	// 	name: "Resume",
	// 	href: "https://docs.google.com/document/d/1Fq7Q72Tay-nIylUo3X1fKvr8Ul8taeuJUUZtXHU6M4o/edit?usp=sharing",
	// 	id: 4,
	// };
	// const footerLinks: footerLink[] = [
	// 	mediumLink,
	// 	linkedInLink,
	// 	githubLink,
	// 	resumeLink,
	// ];

	// Get date for copyright message
	const date = new Date();
	const year = date.getFullYear();
	const cpyRightMsg = `${year} Eitri LLC | All rights reserved`;

	// Tailwind Styling
	const footerStyling =
		"bg-white text-black h-[20%] max-w-[100vw] p-1 border-t-2 border-solid border-pink-300 font-tabs text-xs";
	const linkDivStyling = "flex justify-center space-x-4 mb-1 align-baseline";
	const copyrightStyling = "text-center";

	return (
		<footer className={footerStyling}>
			{/* <div className={linkDivStyling}>
				{footerLinks.map((link) => (
					<motion.a
						href={link.href}
						key={link.id}
						whileHover={{ scale: 1.1, textDecoration: "underline" }}
						whileTap={{ scale: 0.85 }}
						target='_blank'
					>
						<div
							className='p-2 rounded-full w-[70px] flex flex-col items-center'
							key={link.id}
						>
							<motion.div>
								<Image
									src={link.icon}
									alt={link.name}
									height={30}
									width={30}
								></Image>
							</motion.div>
							<p>{link.name}</p>
						</div>
					</motion.a>
				))}
			</div> */}
			<p className={copyrightStyling}>Copyright &copy; {cpyRightMsg}</p>
		</footer>
	);
};

export default Footer;
