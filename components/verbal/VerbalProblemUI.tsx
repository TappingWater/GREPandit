import { VerbalProblem } from "@/lib/apitypes/VerbalTypes";
import { useState } from "react";
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
	const [isReviewMode, setReviewMode] = useState<boolean>(false);

	/**
	 * Function that is used when handling a problem
	 */
	const handleSubmit = (selectedOptions: string[]) => {
		// Your logic for when the problem is answered
		// Then, signal that the problem has been completed:
		console.log(selectedOptions);
		onProblemCompleted();
	};

	/**
	 * Renders the problem based on type
	 */
	const renderProblem = (problem: VerbalProblem) => {
		if (problem.framed_as == "SelectSentence") {
			return (
				<SelectInPassageUI
					isReviewMode={isReviewMode}
					problem={problem}
					handleSubmit={handleSubmit}
				/>
			);
		} else if (problem.type == "ReadingComprehension") {
			return (
				<ReadingComprehensionUI
					isReviewMode={isReviewMode}
					problem={problem}
					handleSubmit={handleSubmit}
				/>
			);
		} else if (problem.type == "TextCompletion") {
			return (
				<TextCompletionUI
					isReviewMode={isReviewMode}
					problem={problem}
					handleSubmit={handleSubmit}
				/>
			);
		} else if (problem.type == "SentenceEquivalence") {
			return (
				<SentenceEquivalanceUI
					isReviewMode={isReviewMode}
					problem={problem}
					handleSubmit={handleSubmit}
				/>
			);
		}
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
				{renderProblem(problem)}
			</div>
		);
	} else {
		return null;
	}
};

export default VerbalProblemUI;
