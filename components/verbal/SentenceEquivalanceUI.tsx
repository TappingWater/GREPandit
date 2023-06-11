import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { PRIMARY_BUTTON_STYLE, PARAGRAPH_STYLE } from "@/lib/styles";
import { useState } from "react";
import {
	displayOptions,
	processReviewParagraph,
	renderButtons,
	renderNotification,
	useVerbalProblem,
} from "../../lib/verbalHelpers";

const SentenceEquivalanceUI = ({
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
	const [displaySelection, setDisplayedSelection] = useState<string>(
		" ........................"
	);

	const splitParagraphIntoBlanks = (paragraph?: string) => {
		return paragraph ? paragraph.split("{BLANK}") : [];
	};
	const blanks = splitParagraphIntoBlanks(problem.paragraph!.String);
	const numberOfBlanks = blanks ? blanks.length - 1 : 0;

	return (
		<div className='text-sm md:text-base'>
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{blanks.map((blank, index) => (
					<span key={index}>
						{reviewMode
							? blank
							: processReviewParagraph(
									blank,
									problem.vocabulary,
									problem.wordmap
							  )}
						{index < numberOfBlanks && displaySelection}
					</span>
				))}
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
					2,
					setEmptyAnswer
				)}
			</div>
		</div>
	);
};

export default SentenceEquivalanceUI;
