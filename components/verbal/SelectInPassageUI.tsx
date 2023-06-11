import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { PRIMARY_BUTTON_STYLE, PARAGRAPH_STYLE } from "@/lib/styles";
import {
	handleRadioChange,
	renderButtons,
	displayOptions,
	processReviewParagraph,
	renderNotification,
	useVerbalProblem,
} from "@/lib/verbalHelpers";
import { useState } from "react";

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

	// normalize text
	const normalizeText = (text: string) => {
		return text
			.toLowerCase()
			.replace(/[.,\n]/g, "")
			.trim();
	};

	// Create a mapping from normalized sentence to its corresponding option
	const sentenceToOption = new Map();
	problem.options?.forEach((option) => {
		sentenceToOption.set(normalizeText(option.value), option);
	});

	const handleSentenceClick = (sentence: string) => {
		if (sentenceToOption.has(normalizeText(sentence))) {
			const option = sentenceToOption.get(normalizeText(sentence)).value;
			setSelectedOptions([option]);
			handleRadioChange(
				option,
				setSelectedOptions,
				false,
				reviewMode,
				setShowMoreInfoOptions
			);
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
							: processReviewParagraph(
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

export default SelectInPassageUI;
