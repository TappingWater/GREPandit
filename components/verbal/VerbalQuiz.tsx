import { VerbalProblem } from "@/lib/apitypes/VerbalTypes";
import { useEffect, useState } from "react";
import VerbalProblemUI from "./VerbalProblemUI";
import {
	getAdaptiveQuestions,
	getQuestions,
	getQuestionsOnVocab,
	getRandomQuestions,
} from "@/lib/api/verbalRequests";
import { markedWordsAtom, userVbStats } from "@/pages/dashboard";
import { useAtom } from "jotai";
import { NextBtnProps, Nextbtn } from "../buttons/Nextbtn";
import Title from "../ui/Title";
import { RaisedBtn } from "../buttons/RaisedBtn";
import { capitalize } from "../../lib/helper/general";
import { motion } from "framer-motion";

/**
 * Render the Quiz section of the User dashboard.
 * Allows the user to retrieve problems from the API.
 */
const VerbalQuiz = () => {
	const [problems, setProblems] = useState<VerbalProblem[]>([]);
	const [currentProblemIndex, setCurrentProblemIndex] = useState(-1);
	const [markedWords] = useAtom(markedWordsAtom);
	const [userStats] = useAtom(userVbStats);
	const [currState, setCurrState] = useState<string>("");
	const [noMoreProblems, setNoMoreProblems] = useState(false);

	useEffect(() => {
		handleProblemCompleted();
	}, [currState]);

	const adaptiveBtn: NextBtnProps = {
		label: "Adaptive",
		text: "Tackle problems that you are weak at based on past performance",
		onClick: () => {
			setProblems([]);
			setCurrentProblemIndex(-1);
			setCurrState("adaptive");
		},
	};
	const vocabBtn: NextBtnProps = {
		label: "Vocabulary",
		text: "Tackle problems based on vocabulary that you have marked and problems answered incorrectly",
		onClick: () => {
			setProblems([]);
			setCurrentProblemIndex(-1);
			setCurrState("vocabulary");
		},
	};
	const randomBtn: NextBtnProps = {
		label: "Random",
		text: "Tackle problems at random",
		onClick: () => {
			setProblems([]);
			setCurrentProblemIndex(-1);
			setCurrState("random");
		},
	};
	const testBtn: NextBtnProps = {
		label: "Test",
		text: "For testing",
		onClick: () => {
			setProblems([]);
			setCurrentProblemIndex(-1);
			setCurrState("test");
		},
	};
	const btnProps: NextBtnProps[] = [
		adaptiveBtn,
		vocabBtn,
		randomBtn,
		testBtn,
	];

	const handleProblemCompleted = () => {
		// If there are more problems, go to next. Otherwise, fetch new problems.
		if (
			currentProblemIndex == problems.length - 1 ||
			problems.length == 0
		) {
			if (currState == "adaptive") {
				getAdaptiveQuestions(getQuestionsToAvoid()).then((problems) => {
					if (problems.length == 0) {
						setNoMoreProblems(true);
					} else {
						setProblems((oldProblems) => [
							...oldProblems,
							...problems,
						]);
					}
				});
			} else if (currState == "vocabulary") {
				getQuestionsOnVocab(
					getQuestionsToAvoid(),
					getWordsToSearchFor()
				).then((problems) => {
					if (problems.length == 0) {
						setNoMoreProblems(true);
					} else {
						setProblems((oldProblems) => [
							...oldProblems,
							...problems,
						]);
					}
				});
			} else if (currState == "random") {
				getRandomQuestions({
					limit: 5,
					exclude_ids: getQuestionsToAvoid(),
				}).then((problems) => {
					if (problems.length == 0) {
						setNoMoreProblems(true);
					} else {
						setProblems((oldProblems) => [
							...oldProblems,
							...problems,
						]);
					}
				});
			} else if (currState == "test") {
				getQuestions([13, 14, 15, 16, 17]).then((problems) => {
					if (problems.length == 0) {
						setNoMoreProblems(true);
					} else {
						setProblems((oldProblems) => [
							...oldProblems,
							...problems,
						]);
					}
				});
			} else {
				return;
			}
		}
		setCurrentProblemIndex((curr) => curr + 1);
	};

	const getQuestionsToAvoid = () => {
		const correctQuestions = new Set<number>();
		const questionsToAvoid = new Set<number>();
		userStats.forEach((stat) => {
			if (stat.correct) {
				const qid = stat.question_id;
				if (correctQuestions.has(qid)) {
					questionsToAvoid.add(qid);
				}
				correctQuestions.add(qid);
			}
		});
		return Array.from(questionsToAvoid);
	};

	const getWordsToSearchFor = () => {
		const wordIds = new Set<number>();
		markedWords.forEach((mw) => wordIds.add(mw.id));
		const incorrectQuestions = new Set<number>();
		userStats.forEach((stat) => {
			if (stat.correct) {
				if (incorrectQuestions.has(stat.question_id)) {
					incorrectQuestions.delete(stat.question_id);
				}
			} else {
				incorrectQuestions.add(stat.question_id);
			}
		});
		userStats
			.filter((stat) => incorrectQuestions.has(stat.question_id))
			.forEach((q) => {
				q.vocabulary.forEach((word) => wordIds.add(word.id));
			});
		return Array.from(wordIds);
	};

	const variants = {
		hidden: { opacity: 0, x: -500 },
		visible: { opacity: 1, x: 0 },
	};

	// Don't render anything if problems haven't loaded yet
	if (currState == "") {
		return (
			<>
				<Title tab={"Quiz"} />
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
	} else {
		return (
			<>
				<Title tab={"Quiz"} subTab={capitalize(currState)} />
				<div className='flex flex-col items-start w-full min-h-screen'>
					<RaisedBtn
						label={"Back"}
						color={"sky"}
						onClick={() => setCurrState("")}
						width={50}
						height={25}
					/>
					<VerbalProblemUI
						problem={problems[currentProblemIndex]}
						onProblemCompleted={handleProblemCompleted}
						noMoreProblems={noMoreProblems}
					/>
				</div>
			</>
		);
	}
};

export default VerbalQuiz;
