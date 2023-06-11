import { VerbalProblem } from "@/lib/apitypes/VerbalTypes";
import ReadingComprehensionUI from "./ReadingComprehensionUI";
import SelectInPassageUI from "./SelectInPassageUI";
import { HEADING_STYLE, UI_STYLE } from "@/lib/styles";
import { insertSpacesBeforeCapitals } from "@/lib/helpers";
import TextCompletionUI from "./TextCompletion";
import SentenceEquivalanceUI from "./SentenceEquivalanceUI";

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
	/**
	 * Function that is used when handling a problem submission.
	 * User stats are sent to the endpoint for saving
	 */
	const handleSubmit = (selectedOptions: string[]) => {
		// Your logic for when the problem is answered
		// Then, signal that the problem has been completed:
		console.log("Submitted");
		console.log(selectedOptions);
	};

	/**
	 * Function that is used when user wants to mark a problem
	 * for later
	 */
	const handleMarkQuestion = (questionId: number) => {
		console.log(questionId);
	};

	/**
	 * Function that is used when the user wants to move
	 * on to the next question
	 */
	const handleNext = () => {
		console.log("NEXT");
		onProblemCompleted();
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
				/>
			);
		} else if (problem.type == "ReadingComprehension") {
			return (
				<ReadingComprehensionUI
					problem={problem}
					handleSubmit={handleSubmit}
					handleNext={handleNext}
				/>
			);
		} else if (problem.type == "TextCompletion") {
			return (
				<TextCompletionUI
					problem={problem}
					handleSubmit={handleSubmit}
					handleNext={handleNext}
				/>
			);
		} else if (problem.type == "SentenceEquivalence") {
			return (
				<SentenceEquivalanceUI
					isReviewMode={false}
					problem={problem}
					handleSubmit={handleSubmit}
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
				<h2 className={`${HEADING_STYLE} text-sm`}>
					{insertSpacesBeforeCapitals(problem.type)}
				</h2>
				{renderProblemDifficulty()}
				{renderProblem(problem)}
			</div>
		);
	} else {
		return null;
	}
};

export default VerbalProblemUI;
