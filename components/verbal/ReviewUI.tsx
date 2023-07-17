import { VerbalProblem, Word } from "@/lib/apitypes/VerbalTypes";
import { useState } from "react";
import { getProblematicWords } from "@/lib/api/userRequests";
import CardCarousel from "./CardCarousel";
import { Nextbtn, NextBtnProps } from "../buttons/Nextbtn";
import Title from "../ui/Title";
import { RaisedBtn } from "../buttons/RaisedBtn";
import { getGeneralWords, getQuestions } from "@/lib/api/verbalRequests";
import { useAtom } from "jotai";
import { markedQuestionsAtom, markedWordsAtom } from "@/pages/dashboard";
import VerbalProblemUI from "./VerbalProblemUI";
import { motion } from "framer-motion";

/**
 * Used to display the list of words marked by the user as
 * well as the words that are likely to come in the GRE exam.
 */
const ReviewUI = () => {
	const [markedProblemIDS] = useAtom(markedQuestionsAtom);
	const [markedProblemsIdx, setMarkedProblemsIdx] = useState(0);
	const [markedProblems, setProblems] = useState<VerbalProblem[]>([]);
	const [markedWords] = useAtom(markedWordsAtom);
	const [markedWordsIdx] = useState(0);
	const [generalWords, setGeneralWords] = useState<Word[]>([]);
	const [generalWordsIdx, setGeneralWordsIdx] = useState(0);
	const [problematicWords, setProblematicWords] = useState<Word[]>([]);
	const [problematicWordsIdx, setProblematicWordsIdx] = useState(0);
	const [currSet, setCurrState] = useState<string>("");

	const personalBtn: NextBtnProps = {
		label: "My Vocabulary",
		text: "Words marked for review",
		onClick: () => {
			setCurrState("Personal");
		},
	};
	const generalBtn: NextBtnProps = {
		label: "General Vocabulary",
		text: "Words that appear frequently in the GRE",
		onClick: () => {
			fetchGeneralWords();
			setCurrState("General");
		},
	};
	const problematicBtn: NextBtnProps = {
		label: "Problematic Vocabulary",
		text: "Words from problems answered incorrectly",
		onClick: () => {
			fetchProblematicWords();
			setCurrState("Problematic");
		},
	};
	const reviewBtn: NextBtnProps = {
		label: "My Problems",
		text: "Verbal reasoning questions marked for review",
		onClick: () => {
			handleProblemCompleted();
			setCurrState("Problems");
		},
	};
	const btnProps: NextBtnProps[] = [
		reviewBtn,
		personalBtn,
		generalBtn,
		problematicBtn,
	];

	const handleProblemCompleted = () => {
		// If there are more problems, go to next. Otherwise, fetch new problems.
		if (
			markedProblemsIdx < markedProblemIDS.size - 1 &&
			markedProblems.length > 0
		) {
			setMarkedProblemsIdx((curr) => curr + 1);
		} else {
			setMarkedProblemsIdx(0);
		}
		if (markedProblemsIdx > markedProblems.length - 1) {
			// Cycle back to the first
			if (markedProblemsIdx + 5 >= markedProblems.length) {
				const reqProbIds = Array.from(markedProblemIDS)
					.slice(markedProblemsIdx, markedProblemIDS.size)
					.concat(
						Array.from(markedProblemIDS).slice(
							0,
							markedProblemIDS.size - markedProblemsIdx
						)
					);
				getQuestions(reqProbIds).then((problems) => {
					setProblems((oldProblems) => [...oldProblems, ...problems]);
				});
			} else {
				const reqProbIds = Array.from(markedProblemIDS).slice(
					markedProblemsIdx,
					markedProblemsIdx + 5
				);
				getQuestions(reqProbIds).then((problems) => {
					setProblems((oldProblems) => [...oldProblems, ...problems]);
				});
			}
		}
	};

	const fetchGeneralWords = () => {
		getGeneralWords().then((words) => {
			setGeneralWords(words);
			setGeneralWordsIdx(0);
		});
	};

	const fetchProblematicWords = () => {
		getProblematicWords().then((words) => {
			setProblematicWords(words);
			setProblematicWordsIdx(0);
		});
	};

	const displayCards = (words: Word[], wordsIdx: number, subTab: string) => {
		if (words && wordsIdx < words.length) {
			return (
				<>
					<Title tab={"Vocabulary"} subTab={subTab} />
					<div className='flex flex-col items-start w-full min-h-screen'>
						<RaisedBtn
							label={"Back"}
							color={"sky"}
							onClick={() => setCurrState("")}
							width={50}
							height={25}
						/>
						<CardCarousel words={words} />
					</div>
				</>
			);
		}
	};

	const variants = {
		hidden: { opacity: 0, x: -500 },
		visible: { opacity: 1, x: 0 },
	};

	if (currSet == "") {
		return (
			<>
				<Title tab={"Review"} />
				<div className='flex flex-col space-y-8 justify-center items-center'>
					{btnProps.map((btnProp, idx) => (
						<motion.div
							key={idx}
							variants={variants}
							initial='hidden'
							animate='visible'
							transition={{ duration: 0.5, delay: idx * 0.2 }}
						>
							<Nextbtn btn={btnProp} />
						</motion.div>
					))}
				</div>
			</>
		);
	} else if (currSet == "Problems") {
		if (markedProblems.length > 0) {
			return (
				<>
					<Title tab={"Review"} subTab={"Marked Questions"} />
					<div className='flex flex-col items-start w-full min-h-screen'>
						<RaisedBtn
							label={"Back"}
							color={"sky"}
							onClick={() => setCurrState("")}
							width={50}
							height={25}
						/>
						<VerbalProblemUI
							problem={markedProblems[markedProblemsIdx]}
							onProblemCompleted={handleProblemCompleted}
							noMoreProblems={false}
						/>
					</div>
				</>
			);
		} else {
			return <>No marked problems</>;
		}
	} else if (currSet == "Personal") {
		return (
			<>
				{displayCards(
					Array.from(markedWords),
					markedWordsIdx,
					"Personal"
				)}
			</>
		);
	} else if (currSet == "General") {
		return <>{displayCards(generalWords, generalWordsIdx, "General")}</>;
	} else {
		return (
			<>
				{displayCards(
					problematicWords,
					problematicWordsIdx,
					"Problematic"
				)}
			</>
		);
	}
};

export default ReviewUI;
