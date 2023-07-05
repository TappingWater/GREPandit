import {
	RandomQuestionRequest,
	VerbalProblem,
} from "@/lib/apitypes/VerbalTypes";
import { useEffect, useState } from "react";
import VerbalProblemUI from "./VerbalProblemUI";
import {
	getAdaptiveQuestions,
	getQuestionsOnVocab,
	getRandomQuestions,
} from "@/lib/api/verbalRequests";
import { markedWordsAtom, userVbStats } from "@/pages/verbal";
import { useAtom } from "jotai";
import { NextBtnProps, Nextbtn } from "../buttons/Nextbtn";
import Title from "../ui/Title";
import { RaisedBtn } from "../buttons/RaisedBtn";
import { capitalize } from "../../lib/helper/general";

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

	useEffect(() => {
		handleProblemCompleted();
	}, [currState]);

	const adaptiveBtn: NextBtnProps = {
		label: "Adaptive",
		text: "Tackle problems that you are weak at based on past performance",
		onClick: () => {
			setProblems([]);
			setCurrentProblemIndex(0);
			setCurrState("adaptive");
		},
	};
	const vocabBtn: NextBtnProps = {
		label: "Vocabulary",
		text: "Tackle problems based on vocabulary that has been marked",
		onClick: () => {
			setProblems([]);
			setCurrentProblemIndex(0);
			setCurrState("vocabulary");
		},
	};
	const randomBtn: NextBtnProps = {
		label: "Random",
		text: "Tackle problems at random",
		onClick: () => {
			setProblems([]);
			setCurrentProblemIndex(0);
			setCurrState("random");
		},
	};
	const btnProps: NextBtnProps[] = [adaptiveBtn, vocabBtn, randomBtn];

	const handleProblemCompleted = () => {
		// If there are more problems, go to next. Otherwise, fetch new problems.
		if (
			currentProblemIndex == problems.length - 1 ||
			problems.length == 0
		) {
			if (currState == "adaptive") {
				getAdaptiveQuestions(getQuestionsToAvoid()).then((problems) =>
					setProblems((oldProblems) => [...oldProblems, ...problems])
				);
			} else if (currState == "vocabulary") {
				getQuestionsOnVocab(
					getQuestionsToAvoid(),
					getWordsToSearchFor()
				).then((problems) => {
					setProblems((oldProblems) => [...oldProblems, ...problems]);
				});
			} else if (currState == "random") {
				getRandomQuestions({
					limit: 5,
					exclude_ids: getQuestionsToAvoid(),
				}).then((problems) => {
					setProblems((oldProblems) => [...oldProblems, ...problems]);
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

	// Don't render anything if problems haven't loaded yet
	if (currState == "") {
		return (
			<>
				<Title tab={"Verbal Reasoning"} subTab={"Quiz"} />
				<div className='flex flex-col space-y-8 justify-center items-center'>
					{btnProps.map((btnProp, idx) => (
						<div key={idx}>
							<Nextbtn btn={btnProp} />
						</div>
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
					/>
				</div>
			</>
		);
	}
};

export default VerbalQuiz;
