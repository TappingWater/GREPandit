import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import ReadingComprehensionUI from "./ReadingComprehensionUI";
import SelectInPassageUI from "./SelectInPassageUI";
import { HEADING_STYLE } from "@/lib/styles";
import {
	addValueToSet,
	insertSpacesBeforeCapitals,
	removeValueFromSet,
} from "@/lib/helper/general";
import TextCompletionUI from "./TextCompletion";
import SentenceEquivalanceUI from "./SentenceEquivalanceUI";
import { useRef, useState } from "react";
import Timer, { TimerHandle } from "../ui/Timer";
import CheckedButton from "../ui/CheckedButton";
import { createVerbalStat } from "@/lib/api/verbalStatRequests";
import { isAnswerCorrect } from "@/lib/helper/verbal";
import { useAtom } from "jotai";
import { markedQuestionsAtom } from "@/pages/verbal";

/**
 * Component used to render a singular verbal problem by the Quiz
 * parent component
 */
const VerbalProblemUI = ({
	problem,
	onProblemCompleted,
}: {
	problem: VerbalProblem;
	onProblemCompleted: () => void;
}) => {
	const [timerDate, setTimerDate] = useState(new Date(Date.now()));
	const timerRef = useRef<TimerHandle | null>(null);
	const [retyingProblem, setRetryingProblem] = useState(false);

	// Handle marking a problem
	const [markedQuestions, setMarkedQuestions] = useAtom(markedQuestionsAtom);
	const toggleMarkQuestion = () => {
		if (markedQuestions.has(problem.id)) {
			setMarkedQuestions(
				new Set([...markedQuestions].filter((mq) => mq != problem.id))
			);
		} else {
			setMarkedQuestions(new Set([...markedQuestions, problem.id]));
		}
	};

	/**
	 * Function that is used when handling a problem submission.
	 * User stats are sent to the endpoint for saving
	 */
	const handleSubmit = (
		selectedOptions: string[],
		optionMap: Map<string, Option>
	) => {
		// Your logic for when the problem is answered
		// Then, signal that the problem has been completed:
		// Pause the timer and log the elapsed time
		if (timerRef.current) {
			timerRef.current.pause(); // pause the timer
			const elapsedTime = timerRef.current.getElapsedTime();
		}
		if (!retyingProblem) {
			createVerbalStat(
				problem.id,
				isAnswerCorrect(selectedOptions, optionMap),
				selectedOptions,
				timerRef.current!.getElapsedTime()
			);
		}
	};

	/**
	 * Function that is used when the user wants to move
	 * on to the next question
	 */
	const handleNext = () => {
		if (timerRef.current) {
			timerRef.current.reset();
		}
		setRetryingProblem(false);
		onProblemCompleted();
		setTimerDate(new Date(Date.now()));
	};

	/**
	 * Function that is used when the user wants to retry
	 * a problem
	 */
	const handleRetry = () => {
		setRetryingProblem(true);
		setTimerDate(new Date(Date.now()));
	};

	/**
	 * Renders the problem based on type
	 */
	const renderProblem = (problem: VerbalProblem) => {
		if (problem.framed_as == "SelectSentence") {
			return (
				<SelectInPassageUI
					problem={problem}
					handleSubmit={handleSubmit}
					handleNext={handleNext}
					handleRetry={handleRetry}
				/>
			);
		} else if (problem.type == "ReadingComprehension") {
			return (
				<ReadingComprehensionUI
					problem={problem}
					handleSubmit={handleSubmit}
					handleNext={handleNext}
					handleRetry={handleRetry}
				/>
			);
		} else if (problem.type == "TextCompletion") {
			return (
				<TextCompletionUI
					problem={problem}
					handleSubmit={handleSubmit}
					handleNext={handleNext}
					handleRetry={handleRetry}
				/>
			);
		} else if (problem.type == "SentenceEquivalence") {
			return (
				<SentenceEquivalanceUI
					problem={problem}
					handleSubmit={handleSubmit}
					handleNext={handleNext}
					handleRetry={handleRetry}
				/>
			);
		}
	};

	/**
	 * Render problem difficulty
	 */
	const renderProblemDifficulty = () => {
		var style = "text-sky-500";
		if (problem.difficulty == "Medium") {
			style = "text-indigo-600";
		} else if (problem.difficulty == "Hard") {
			style = "text-pink-600";
		}
		return (
			<p>
				<span className={`${style} text-sm font-semibold font-tabs`}>
					{problem.difficulty}:
				</span>
				<span
					className={`text-sky-700 text-sm font-semibold font-tabs`}
				>
					{" " + insertSpacesBeforeCapitals(problem.competence)}
				</span>
			</p>
		);
	};

	/**
	 * If problem is still being loaded display the React spinner
	 */
	if (problem) {
		return (
			<div className={"m-auto font-text w-[90%] md:w-[85%]"}>
				<div className='flex flex-row'>
					<h2 className={`${HEADING_STYLE} text-sm w-[60%]`}>
						{insertSpacesBeforeCapitals(
							problem.type + ": " + problem.id
						)}
						{renderProblemDifficulty()}
						<Timer
							ref={timerRef}
							time={new Date(Date.now())}
						></Timer>
					</h2>
					<div className='flex-grow flex flex-row justify-end'>
						<CheckedButton
							onClick={toggleMarkQuestion}
							isChecked={markedQuestions.has(problem.id)}
							checkedText='Marked'
							uncheckedText='Mark Question'
							checkedStyles='shadow-inner shadow-sky-500'
							unCheckedStyles='shadow-large shadow-sky-500'
							toolTipText='Marked questions can be reviewed later'
						></CheckedButton>
					</div>
				</div>
				{renderProblem(problem)}
			</div>
		);
	} else {
		return null;
	}
};

export default VerbalProblemUI;
