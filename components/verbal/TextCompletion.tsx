import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import useVerbalProblem from "@/lib/hooks/useVerbalProblem";
import { PARAGRAPH_STYLE } from "@/lib/styles";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	renderButtons,
	renderNotification,
	renderReviewVocab,
	getJustificationDisplay,
} from "@/lib/helper/verbal";
import { capitalize } from "@/lib/helper/general";

/**
 * Component for rendering verbal problems where user has
 * to complete the text from certain options
 */
const TextCompletionUI = ({
	problem,
	handleSubmit,
	handleNext,
	handleRetry,
}: {
	problem: VerbalProblem;
	handleSubmit: (
		selectedOptions: string[],
		optionMap: Map<string, Option>
	) => void;
	handleNext: () => void;
	handleRetry: () => void;
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
		selectedAnswers,
		setSelectedAnswers,
		notificationMsg,
		setNotificationMsg,
		reviewMode,
		setReviewMode,
		optionJustificationDisplayMap,
		setOptionJustificationDisplayMap,
		handleSubmitProb,
		handleRetryProb,
		handleNextProb,
		optionMap,
	} = useVerbalProblem(problem, handleSubmit, handleNext, handleRetry);

	const handleSelectChange = (index: number, value: string) => {
		if (selectedAnswers.length != 0 && reviewMode == false) {
			return;
		}
		let newSelectedOptions = [...selectedOptions];
		newSelectedOptions[index] = value;
		setSelectedOptions(newSelectedOptions);
		if (reviewMode) {
			setOptionJustificationDisplayMap(
				getJustificationDisplay(newSelectedOptions)
			);
		}
	};

	const isOptionCorrect = (index: number) => {
		let selectedOption = reviewMode
			? selectedOptions[index]
			: selectedAnswers[index];
		const correct = optionMap.get(selectedOption)?.correct;
		return correct === true;
	};

	const renderSelectColor = (index: number) => {
		const isDisabled = selectedAnswers.length != 0 || reviewMode == false;
		const selectedOption = isDisabled
			? selectedAnswers[index]
			: selectedOptions[index];
		const correct = optionMap.get(selectedOption)?.correct;
		if (reviewMode || selectedAnswers.length == 0) {
			return "bg-white text-slate-700";
		}
		if (correct) {
			return "bg-sky-500 text-white";
		} else {
			return "bg-pink-500 text-white";
		}
	};

	const getSelectValue = (index: number) => {
		if (selectedAnswers.length != 0 && reviewMode == false) {
			return selectedAnswers[index];
		}
		if (selectedOptions[index] !== undefined) {
			return selectedOptions[index];
		} else {
			return "Select a word";
		}
	};

	const generateParagraphWithBlanks = () => {
		return (
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{blanks.map((blank, index) => (
					<span key={index}>
						{renderReviewVocab(
							blank,
							problem.vocabulary,
							problem.wordmap
						)}
						{index < numberOfBlanks && (
							<Select
								onValueChange={(value) =>
									handleSelectChange(index, value)
								}
								value={getSelectValue(index)}
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
						const optionCorrect = isOptionCorrect(index);
						const textColor = optionCorrect
							? "text-sky-400"
							: "text-pink-600";
						const justification =
							optionMap.get(selectedOption)!.justification;
						return (
							<p key={index + "-choice"}>
								<span className='font-tabs font-light'>
									Choice {index + 1}:{"  "}
								</span>
								<span
									className={`${textColor} font-tabs font-semibold`}
								>
									{renderReviewVocab(
										capitalize(selectedOptions[index]),
										problem.vocabulary,
										problem.wordmap
									)}
								</span>
								<br />
								<span className={`${textColor} font-subText`}>
									{renderReviewVocab(
										justification,
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
			<div>{renderNotification(notificationMsg, reviewMode)}</div>
			<div className='flex justify-end space-x-4'>
				{renderButtons(
					numberOfBlanks,
					selectedOptions,
					selectedAnswers,
					reviewMode,
					optionMap,
					setOptionJustificationDisplayMap,
					setNotificationMsg,
					setSelectedAnswers,
					setReviewMode,
					handleSubmitProb,
					handleNextProb,
					handleRetryProb
				)}
			</div>
		</div>
	);
};

export default TextCompletionUI;
