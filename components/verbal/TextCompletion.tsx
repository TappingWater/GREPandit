import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { PRIMARY_BUTTON_STYLE, PARAGRAPH_STYLE } from "@/lib/styles";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	displayOptions,
	processReviewParagraph,
	renderButtons,
	renderNotification,
	useVerbalProblem,
} from "@/lib/verbalHelpers";
import { capitalize } from "@/lib/helpers";

const TextCompletionUI = ({
	problem,
	handleSubmit,
	handleNext,
}: {
	problem: VerbalProblem;
	handleSubmit: (selectedOptions: string[]) => void;
	handleNext: () => void;
}) => {
	const splitParagraphIntoBlanks = (paragraph?: string) => {
		return paragraph ? paragraph.split("{BLANK}") : [];
	};

	const blanks = splitParagraphIntoBlanks(problem.paragraph!.String);
	const numberOfBlanks = blanks ? blanks.length - 1 : 0;
	const numberOfOptionsPerBlank = numberOfBlanks === 1 ? 5 : 3;

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

	const handleSelectChange = (index: number, value: string) => {
		if (answeredCorrectly == false && !reviewMode) {
			return;
		}
		let newSelectedOptions = [...selectedOptions];
		newSelectedOptions[index] = value;
		setSelectedOptions(newSelectedOptions);
	};

	const isOptionCorrect = (index: number) => {
		const selectedOption = selectedOptions[index];
		const correct = optionMap.get(selectedOption)?.correct;
		if (correct) {
			return true;
		} else {
			return false;
		}
	};

	const renderSelectColor = (index: number) => {
		if (answeredCorrectly == null) {
			return "bg-white text-slate-900";
		} else {
			if (isOptionCorrect(index)) {
				return "bg-sky-500 text-white";
			} else {
				return "bg-pink-500 text-white";
			}
		}
	};

	const generateParagraphWithBlanks = () => {
		console.log(selectedOptions);
		return (
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{blanks.map((blank, index) => (
					<span key={index}>
						{processReviewParagraph(
							blank,
							problem.vocabulary,
							problem.wordmap
						)}
						{index < numberOfBlanks && (
							<Select
								onValueChange={(value) =>
									handleSelectChange(index, value)
								}
								value={
									selectedOptions[index] !== undefined
										? selectedOptions[index]
										: "Select a word"
								}
							>
								<SelectTrigger
									className={`${renderSelectColor(
										index
									)} ml-2 mr-2 inline-flex h-[25px] w-[140px] text-sm border-none  font-semibold`}
								>
									<SelectValue placeholder='Select a word' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem
										value='Select a word'
										className='hidden'
									>
										Select a word
									</SelectItem>
									{problem.options
										?.slice(
											index * numberOfOptionsPerBlank,
											(index + 1) *
												numberOfOptionsPerBlank
										)
										.map((option, optionIndex) => (
											<SelectItem
												key={option.value + optionIndex}
												value={option.value}
												className='font-tabs'
											>
												{option.value}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						)}
					</span>
				))}
			</p>
		);
	};

	const renderReviewNotification = () => {
		if (reviewMode) {
			return (
				<p className='bg-white rounded text-black p-4'>
					{selectedOptions.map((selectedOption, index) => {
						return (
							<p key={index + "-choice"}>
								<span className='font-tabs font-light'>
									Choice {index + 1}:{"  "}
								</span>
								<span
									className={`${
										!isOptionCorrect(index)
											? "text-pink-600"
											: "text-slate-600"
									} font-tabs font-semibold`}
								>
									{processReviewParagraph(
										capitalize(selectedOptions[index]),
										problem.vocabulary,
										problem.wordmap
									)}
								</span>
								<br />
								<span
									className={`${
										!isOptionCorrect(index)
											? "text-pink-600"
											: "text-slate-600"
									} font-subText`}
								>
									{processReviewParagraph(
										optionMap.get(selectedOption)!
											.justification,
										problem.vocabulary,
										problem.wordmap
									)}
								</span>
							</p>
						);
					})}
				</p>
			);
		}
	};

	return (
		<div className='text-sm md:text-base'>
			{blanks && generateParagraphWithBlanks()}
			<p className={`${PARAGRAPH_STYLE} font-semibold`}>
				{problem.question}
			</p>
			{renderReviewNotification()}
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
					numberOfBlanks,
					setEmptyAnswer
				)}
			</div>
		</div>
	);
};

export default TextCompletionUI;
