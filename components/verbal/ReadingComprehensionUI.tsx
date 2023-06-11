import { useState } from "react";
import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { PARAGRAPH_STYLE } from "@/lib/styles";
import {
	displayOptions,
	processReviewParagraph,
	renderButtons,
	renderNotification,
	useVerbalProblem,
} from "@/lib/verbalHelpers";

/**
 * Child component used by the Verbal Problem UI to
 * render verbal problems of type reading comprehension.
 * If review mode is enabled allows user to check for justification
 * and highlights complex words and allows them to mark it for review
 */
const ReadingComprehensionUI = ({
	problem,
	handleSubmit,
	handleNext,
}: {
	problem: VerbalProblem;
	handleSubmit: (selectedOptions: string[]) => void;
	handleNext: () => void;
}) => {
	const {
		selectedOptions,
		setSelectedOptions,
		answeredCorrectly,
		setAnsweredCorrectly,
		reviewMode,
		setReviewMode,
		showMoreInfoOptions,
		setShowMoreInfoOptions,
		resetProblem,
		handleNextProb,
		optionMap,
		emptyAnswer,
		setEmptyAnswer,
	} = useVerbalProblem(problem, handleSubmit, handleNext);

	return (
		<div className='text-sm md:text-base'>
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{!reviewMode
					? problem.paragraph?.String
					: processReviewParagraph(
							problem.paragraph!.String!,
							problem.vocabulary,
							problem.wordmap
					  )}
			</p>
			<p className={`${PARAGRAPH_STYLE} font-semibold`}>
				{problem.question}
			</p>
			<ul className='bg-white text-black rounded-lg mt-2 mb-2 md:mt-4 md:mb-4 p-2'>
				{displayOptions(
					answeredCorrectly,
					reviewMode,
					problem.options,
					problem,
					selectedOptions,
					showMoreInfoOptions,
					setSelectedOptions,
					setShowMoreInfoOptions
				)}
			</ul>
			<div>
				{renderNotification(emptyAnswer, reviewMode, answeredCorrectly)}
			</div>
			<div className='flex justify-end space-x-4'>
				{renderButtons(
					selectedOptions,
					optionMap,
					showMoreInfoOptions,
					reviewMode,
					setShowMoreInfoOptions,
					setAnsweredCorrectly,
					setReviewMode,
					answeredCorrectly,
					handleSubmit,
					handleNextProb,
					resetProblem,
					1,
					setEmptyAnswer
				)}
			</div>
		</div>
	);
};

export default ReadingComprehensionUI;
