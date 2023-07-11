import { motion } from "framer-motion";
import Title from "../ui/Title";
import { NextLink, NextLinkProps } from "../buttons/NextLink";

const Dashboard = () => {
	const reviewBtn: NextLinkProps = {
		label: "Review",
		text: "Review problems and vocabulary have been marked and answered incorrectly.",
		href: "/dashboard?tab=review",
	};
	const quizBtn: NextLinkProps = {
		label: "Quiz",
		text: "Tackle a range of problems based on the Verbal Reasoning section.",
		href: "/dashboard?tab=quiz",
	};
	const statsBtn: NextLinkProps = {
		label: "Stats",
		text: "Visualization of collected statistics based on answered problems on this platform.",
		href: "/dashboard?tab=stats",
	};
	const infoBtn: NextLinkProps = {
		label: "Info",
		text: "Information regarding the GRE examination and the platform.",
		href: "/dashboard?tab=info",
	};
	const btnProps: NextLinkProps[] = [quizBtn, reviewBtn, statsBtn, infoBtn];

	const variants = {
		hidden: { opacity: 0, x: -500 },
		visible: { opacity: 1, x: 0 },
	};

	return (
		<div className='min-h-screen w-full flex-col'>
			<Title tab={"Dashboard"} />
			<div className='flex flex-col space-y-8 justify-center items-center'>
				{btnProps.map((btnProp, idx) => (
					<motion.div
						key={idx}
						variants={variants}
						initial='hidden'
						animate='visible'
						transition={{ duration: 0.5, delay: idx * 0.2 }}
					>
						<NextLink link={btnProp} />
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
