import { VerbalProblem } from "@/lib/apitypes/VerbalTypes";
import useVerbalProblem from "@/lib/hooks/useVerbalProblem";
import { PARAGRAPH_STYLE } from "@/lib/styles";
import {
	renderOptions,
	renderButtons,
	renderNotification,
	renderReviewVocab,
	getJustificationDisplay,
} from "@/lib/verbalHelpers";
import { normalizeText } from "@/lib/helpers";

/**
 * Component used to render verbal problems where user has to select a sentence
 * from a paragraph
 */
const SelectInPassageUI = ({
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
		selectedAnswers,
		setSelectedAnswers,
		notificationMsg,
		setNotificationMsg,
		reviewMode,
		setReviewMode,
		optionJustificationDisplayMap,
		setOptionJustificationDisplayMap,
		resetProblem,
		handleNextProb,
		optionMap,
	} = useVerbalProblem(problem, handleSubmit, handleNext);

	// Create a mapping from normalized sentence to its corresponding option
	const sentenceToOption = new Map();
	problem.options?.forEach((option) => {
		sentenceToOption.set(normalizeText(option.value), option);
	});

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

	const handleSentenceClick = (sentence: string) => {
		if (sentenceToOption.has(normalizeText(sentence))) {
			const option = sentenceToOption.get(normalizeText(sentence)).value;
			handleRadioChange(option);
		}
	};

	const sentences = problem.paragraph?.String.split(".");

	return (
		<div className='text-sm md:text-base'>
			<div className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{sentences?.map((sentence, index) => (
					<span
						key={index}
						className={`p-1 rounded ${
							sentenceToOption.has(normalizeText(sentence))
								? "cursor-pointer underline decoration-dashed underline-offset-4 decoration-1 hover:bg-white hover:text-slate-900"
								: ""
						} ${
							selectedOptions.includes(
								sentenceToOption.get(normalizeText(sentence))
									?.value
							)
								? "bg-white text-slate-900"
								: ""
						}`}
						onClick={() => handleSentenceClick(sentence)}
					>
						{!reviewMode
							? sentence
							: renderReviewVocab(
									sentence,
									problem.vocabulary,
									problem.wordmap
							  )}
						{index !== sentences.length - 1 ? ". " : ""}
					</span>
				))}
			</div>
			<p className={`${PARAGRAPH_STYLE} font-semibold`}>
				{problem.question}
				<span className='italic whitespace-pre font-light'>
					(Click on the sentence in the paragraph or choose from the
					given options)
				</span>
			</p>
			<ul className='bg-white text-black rounded-lg mt-2 mb-2 md:mt-4 md:mb-4 p-2'>
				{renderOptions(
					true,
					reviewMode,
					problem.options,
					problem,
					selectedOptions,
					selectedAnswers,
					optionJustificationDisplayMap,
					handleSentenceClick
				)}
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
					resetProblem
				)}
			</div>
		</div>
	);
};

export default SelectInPassageUI;
