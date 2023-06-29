import { VerbalProblem, Word } from "@/lib/apitypes/VerbalTypes";
import { useState } from "react";
import { getProblematicWords } from "@/lib/api/userRequests";
import CardCarousel from "./CardCarousel";
import { Nextbtn, NextBtnProps } from "../buttons/Nextbtn";
import Title from "../ui/Title";
import { RaisedBtn } from "../buttons/RaisedBtn";
import { getGeneralWords, getQuestions } from "@/lib/api/verbalRequests";
import { useAtom } from "jotai";
import { markedQuestionsAtom, markedWordsAtom } from "@/pages/verbal";
import VerbalProblemUI from "./VerbalProblemUI";

/**
 * Used to display the list of words marked by the user as
 * well as the words that are likely to come in the GRE exam.
 */
const Vocabulary = () => {
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
		label: "Personal",
		text: "Words marked for review",
		onClick: () => {
			setCurrState("Personal");
		},
	};
	const generalBtn: NextBtnProps = {
		label: "General",
		text: "Words that appear frequently in the GRE",
		onClick: () => {
			fetchGeneralWords();
			setCurrState("General");
		},
	};
	const problematicBtn: NextBtnProps = {
		label: "Problematic",
		text: "Words from problems answered incorrectly",
		onClick: () => {
			fetchProblematicWords();
			setCurrState("Problematic");
		},
	};
	const reviewBtn: NextBtnProps = {
		label: "Problems",
		text: "Verbal reasoning questions marked for review",
		onClick: () => {
			handleProblemCompleted();
			setCurrState("Problems");
		},
	};
	const btnProps: NextBtnProps[] = [
		personalBtn,
		generalBtn,
		problematicBtn,
		reviewBtn,
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

	if (currSet == "") {
		return (
			<>
				<Title tab={"Verbal Reasoning"} subTab={"Vocabulary"} />
				<div className='flex flex-col space-y-8 justify-center items-center'>
					{btnProps.map((btnProp, idx) => (
						<div key={idx}>
							<Nextbtn btn={btnProp} />
						</div>
					))}
				</div>
			</>
		);
	} else if (currSet == "Problems") {
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
					/>
				</div>
			</>
		);
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

export default Vocabulary;
