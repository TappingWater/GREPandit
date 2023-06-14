import { VerbalProblem } from "@/lib/apitypes/VerbalTypes";
import useVerbalProblem from "@/lib/hooks/useVerbalProblem";
import { useEffect, useState } from "react";
import { PARAGRAPH_STYLE } from "@/lib/styles";
import {
	renderOptions,
	renderButtons,
	renderNotification,
	renderReviewVocab,
	getJustificationDisplay,
} from "@/lib/helper/verbal";

/**
 * Component used to render a verbal question problem with the type
 * of sentence equivalence
 */
const SentenceEquivalanceUI = ({
	problem,
	handleSubmit,
	handleNext,
	handleRetry,
}: {
	problem: VerbalProblem;
	handleSubmit: (selectedOptions: string[]) => void;
	handleNext: () => void;
	handleRetry: () => void;
}) => {
	const {
		selectedOptions,
		setSelectedOptions,
		selectedAnswers,
		setSelectedAnswers,
		notificationMsg,
		setNotificationMsg,
		reviewMode,
		setReviewMode,
		optionJustificationDisplayMap,
		setOptionJustificationDisplayMap,
		handleRetryProb,
		handleNextProb,
		optionMap,
	} = useVerbalProblem(problem, handleSubmit, handleNext, handleRetry);
	const [displaySelection, setDisplayedSelection] =
		useState<string>("              ");
	useEffect(() => {
		if (!reviewMode && selectedAnswers.length > 0) {
			setDisplayedSelection(selectedAnswers.join(" / "));
		}
	}, [reviewMode, selectedAnswers]);

	const handleRetrySentenceProb = () => {
		handleRetryProb();
		setDisplayedSelection("              ");
		handleRetry();
	};

	const splitParagraphIntoBlanks = (paragraph?: string) => {
		return paragraph ? paragraph.split("{BLANK}") : [];
	};
	const blanks = splitParagraphIntoBlanks(problem.paragraph!.String);
	const numberOfBlanks = blanks ? blanks.length - 1 : 0;

	// Update selected options for MCQMultipleChoice type
	const handleCheckboxChange = (optionValue: string) => {
		if (selectedAnswers.length != 0 && reviewMode == false) {
			return;
		}
		let newSelectedOptions;
		if (selectedOptions.includes(optionValue)) {
			newSelectedOptions = selectedOptions.filter(
				(opt) => opt !== optionValue
			);
		} else {
			newSelectedOptions = [...selectedOptions, optionValue];
		}
		if (newSelectedOptions.length > 2) {
			newSelectedOptions.shift();
		}
		if (newSelectedOptions.length == 0) {
			setDisplayedSelection("              ");
		} else {
			setDisplayedSelection(newSelectedOptions.join(" / "));
		}
		setSelectedOptions(newSelectedOptions);
		if (reviewMode) {
			setOptionJustificationDisplayMap(
				getJustificationDisplay(newSelectedOptions)
			);
		}
	};

	return (
		<div className='text-sm md:text-base'>
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{blanks.map((blank, index) => (
					<span key={index}>
						{reviewMode
							? blank
							: renderReviewVocab(
									blank,
									problem.vocabulary,
									problem.wordmap
							  )}
						{index < numberOfBlanks && (
							<span className='underline underline-offset-8 decoration-dashed min-w-[40px]'>
								{displaySelection.replace(/ /g, "\u00A0")}
							</span>
						)}
					</span>
				))}
			</p>
			<p className={`${PARAGRAPH_STYLE} font-semibold`}>
				{problem.question}
			</p>
			<ul className='bg-white text-black rounded-lg mt-2 mb-2 md:mt-4 md:mb-4 p-2'>
				{renderOptions(
					false,
					reviewMode,
					problem.options,
					problem,
					selectedOptions,
					selectedAnswers,
					optionJustificationDisplayMap,
					handleCheckboxChange
				)}
			</ul>
			<div>{renderNotification(notificationMsg, reviewMode)}</div>
			<div className='flex justify-end space-x-4'>
				{renderButtons(
					2,
					selectedOptions,
					selectedAnswers,
					reviewMode,
					optionMap,
					setOptionJustificationDisplayMap,
					setNotificationMsg,
					setSelectedAnswers,
					setReviewMode,
					handleSubmit,
					handleNextProb,
					handleRetrySentenceProb
				)}
			</div>
		</div>
	);
};

export default SentenceEquivalanceUI;
