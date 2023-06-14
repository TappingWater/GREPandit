import { VerbalProblem } from "@/lib/apitypes/VerbalTypes";
import useVerbalProblem from "@/lib/hooks/useVerbalProblem";
import { PARAGRAPH_STYLE } from "@/lib/styles";
import {
	renderOptions,
	renderButtons,
	renderNotification,
	renderReviewVocab,
	getJustificationDisplay,
} from "@/lib/helper/verbal";

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
		setSelectedOptions(newSelectedOptions);
		if (reviewMode) {
			setOptionJustificationDisplayMap(
				getJustificationDisplay(newSelectedOptions)
			);
		}
	};

	// Update selected option for MCQSingleAnswer type
	const handleRadioChange = (optionValue: string) => {
		if (selectedAnswers.length != 0 && reviewMode == false) {
			return;
		}
		const newSelectedOptions = [optionValue];
		setSelectedOptions(newSelectedOptions);
		if (reviewMode) {
			setOptionJustificationDisplayMap(
				getJustificationDisplay(newSelectedOptions)
			);
		}
	};

	// Renders the option based on type
	const renderOptionsBasedOnFramedAs = () => {
		if (problem.framed_as === "MCQSingleAnswer") {
			return renderOptions(
				true,
				reviewMode,
				problem.options,
				problem,
				selectedOptions,
				selectedAnswers,
				optionJustificationDisplayMap,
				handleRadioChange
			);
		} else {
			return renderOptions(
				false,
				reviewMode,
				problem.options,
				problem,
				selectedOptions,
				selectedAnswers,
				optionJustificationDisplayMap,
				handleCheckboxChange
			);
		}
	};

	return (
		<div className='text-sm md:text-base'>
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{!reviewMode
					? problem.paragraph?.String
					: renderReviewVocab(
							problem.paragraph!.String!,
							problem.vocabulary,
							problem.wordmap
					  )}
			</p>
			<p className={`${PARAGRAPH_STYLE} font-semibold`}>
				{problem.question}
			</p>
			<ul className='bg-white text-black rounded-lg mt-2 mb-2 md:mt-4 md:mb-4 p-2'>
				{renderOptionsBasedOnFramedAs()}
			</ul>
			<div>{renderNotification(notificationMsg, reviewMode)}</div>
			<div className='flex justify-end space-x-4'>
				{renderButtons(
					1,
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
					handleRetryProb
				)}
			</div>
		</div>
	);
};

export default ReadingComprehensionUI;
