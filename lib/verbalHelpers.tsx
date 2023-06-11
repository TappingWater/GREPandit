import { VerbalProblem, Option, Word } from "@/lib/apitypes/VerbalTypes";
import { useState, useCallback } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { capitalize, removePunctuation } from "./helpers";

const PRIMARY_BUTTON_STYLE =
	"min-w-[80px] bg-sky-700 mt-2 mb-2 p-1 md:mt-4 md:mb-4 md:p-2 rounded font-tabs ml-auto drop-shadow-2xl hover:bg-sky-600 active:bg-sky-400 active:shadow-inner transition-all";

export const useVerbalProblem = (
	problem: VerbalProblem,
	handleSubmit: (selectedOptions: string[]) => void,
	handleNext: () => void
) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
		null
	);
	const [reviewMode, setReviewMode] = useState<boolean>(false);
	const [emptyAnswer, setEmptyAnswer] = useState<boolean>(false);
	const [showMoreInfoOptions, setShowMoreInfoOptions] = useState<
		Map<string, boolean>
	>(
		problem.options.reduce((map, option) => {
			map.set(option.value, false);
			return map;
		}, new Map<string, boolean>())
	);

	const resetProblem = () => {
		setSelectedOptions([]);
		setAnsweredCorrectly(null);
		setReviewMode(false);
		setShowMoreInfoOptions((prevShowMoreInfoOptions) => {
			const newShowMoreInfoOptions = new Map();
			problem.options.map((option) =>
				newShowMoreInfoOptions.set(option.value, false)
			);
			return newShowMoreInfoOptions;
		});
	};

	const handleNextProb = () => {
		handleNext();
		resetProblem();
	};

	const optionMap = problem.options.reduce((map, option) => {
		map.set(option.value, option);
		return map;
	}, new Map<string, Option>());

	return {
		selectedOptions,
		setSelectedOptions,
		answeredCorrectly,
		setAnsweredCorrectly,
		reviewMode,
		setReviewMode,
		showMoreInfoOptions,
		emptyAnswer,
		setEmptyAnswer,
		setShowMoreInfoOptions,
		resetProblem,
		handleNextProb,
		optionMap,
	};
};

export const WordDialog = ({ label, word }: { label: string; word: Word }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<span className='mr-1 text-sky-600 hover:underline hover:decoration-dotted hover:cursor-pointer hover:text-sky-400 transition-all'>
					{label}
				</span>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='text-sky-700'>
						{capitalize(word.word)}
					</DialogTitle>
					<DialogDescription>Definition</DialogDescription>
				</DialogHeader>
				<div>
					{word.meanings.map((meaning, index) => {
						return (
							<div
								className='text-sm font-light'
								key={meaning.meaning + index}
							>
								<p className='font-tabs text-sky-600'>
									{capitalize(meaning.type)}
								</p>
								<p className='font-semibold text-slate-700'>
									{meaning.meaning}
								</p>
								<p className='text-pink-700'>Examples:</p>
								<ul className='list-disc font-tabs pl-4 pr-4'>
									{meaning.examples.map((ex) => {
										return <li key={ex}>{ex}</li>;
									})}
								</ul>
								<p className='text-pink-700'>Synonyms:</p>
								<p className='font-tabs'>
									{meaning.synonyms.map((synonym, index) => (
										<>
											{synonym}
											{index < meaning.synonyms.length - 1
												? ", "
												: ""}
										</>
									))}
								</p>
							</div>
						);
					})}
				</div>
				<DialogFooter>
					<button
						className={`${PRIMARY_BUTTON_STYLE} text-white text-sm`}
					>
						Add to my list
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

// Update selected options for MCQMultipleChoice type
export const handleCheckboxChange = (
	optionValue: string,
	selectedOptions: string[],
	setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
	disabled: boolean,
	reviewMode: boolean,
	setShowMoreInfoOptions: React.Dispatch<
		React.SetStateAction<Map<string, boolean>>
	>
) => {
	if (disabled) {
		return;
	}
	if (selectedOptions.includes(optionValue)) {
		setSelectedOptions(
			selectedOptions.filter((opt) => opt !== optionValue)
		);
		if (reviewMode) {
			setShowMoreInfoOptions((prevShowMoreInfoOptions) => {
				const newShowMoreInfoOptions = new Map(prevShowMoreInfoOptions);
				newShowMoreInfoOptions.set(optionValue, false);
				return newShowMoreInfoOptions;
			});
		}
	} else {
		setSelectedOptions([...selectedOptions, optionValue]);
		if (reviewMode) {
			setShowMoreInfoOptions((prevShowMoreInfoOptions) => {
				const newShowMoreInfoOptions = new Map(prevShowMoreInfoOptions);
				newShowMoreInfoOptions.set(optionValue, true);
				return newShowMoreInfoOptions;
			});
		}
	}
};

// Update selected option for MCQSingleAnswer type
export const handleRadioChange = (
	optionValue: string,
	setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
	disabled: boolean,
	reviewMode: boolean,
	setShowMoreInfoOptions: React.Dispatch<
		React.SetStateAction<Map<string, boolean>>
	>
) => {
	if (disabled) {
		return;
	}
	if (reviewMode) {
		setShowMoreInfoOptions((prevShowMoreInfoOptions) => {
			const newShowMoreInfoOptions = new Map();
			newShowMoreInfoOptions.set(optionValue, true);
			return newShowMoreInfoOptions;
		});
	}
	setSelectedOptions([optionValue]);
};

// Function that handles when a user submits
export const checkAnswer = (
	selectedOptions: string[],
	optionMap: Map<string, Option>,
	showMoreInfoOptions: Map<string, boolean>,
	setShowMoreInfoOptions: React.Dispatch<
		React.SetStateAction<Map<string, boolean>>
	>,
	handleSubmit: (selectedOptions: string[]) => void,
	setAnsweredCorrectly: React.Dispatch<React.SetStateAction<boolean | null>>,
	minRequired: number,
	setEmptyAnswer: React.Dispatch<React.SetStateAction<boolean>>
) => {
	if (selectedOptions.length < minRequired) {
		setEmptyAnswer(true);
		return;
	}
	setEmptyAnswer(false);
	setAnsweredCorrectly(true);
	var chosenOptions = new Set(selectedOptions);
	optionMap.forEach((option: Option, optionVal: string) => {
		if (chosenOptions.has(optionVal)) {
			setShowMoreInfoOptions((prevShowMoreInfoOptions) => {
				const newShowMoreInfoOptions = new Map(prevShowMoreInfoOptions);
				newShowMoreInfoOptions.set(optionVal, true);
				return newShowMoreInfoOptions;
			});
			if (option.correct == false) {
				setAnsweredCorrectly(false);
			}
		} else if (option.correct == true) {
			setAnsweredCorrectly(false);
		}
	});
	handleSubmit(selectedOptions);
};

// Function that handles the displaying of the notification
export const renderNotification = (
	emptyAnswer: boolean,
	reviewMode: boolean,
	answeredCorrectly: boolean | null
) => {
	console.log(emptyAnswer);
	if (emptyAnswer) {
		return (
			<p className='bg-white text-pink-700 rounded p-2 w-full text-semibold'>
				Please select the minimum number of choices before submitting
			</p>
		);
	} else if (answeredCorrectly == null || reviewMode) {
		return null;
	} else if (answeredCorrectly == true) {
		return (
			<p className='bg-white text-sky-700 rounded p-2 w-full text-semibold'>
				Congratulations! You answered correctly. Press Next to move onto
				a new question.
			</p>
		);
	} else {
		return (
			<div className='bg-white text-pink-700 rounded p-2 w-full text-semibold'>
				Unfortunately! You did not get that quite right. You can press
				inspect to review the question or skip to another question.
			</div>
		);
	}
};

// Function that handles the displaying of buttons
export const renderButtons = (
	selectedOptions: string[],
	optionMap: Map<string, Option>,
	showMoreInfoOptions: Map<string, boolean>,
	reviewMode: boolean,
	setShowMoreInfoOptions: React.Dispatch<
		React.SetStateAction<Map<string, boolean>>
	>,
	setAnsweredCorrectly: React.Dispatch<React.SetStateAction<boolean | null>>,
	setReviewMode: React.Dispatch<React.SetStateAction<boolean>>,
	answeredCorrectly: boolean | null,
	handleSubmit: (selectedOptions: string[]) => void,
	handleNext: () => void,
	resetProblem: () => void,
	minRequired: number,
	setEmptyAnswer: React.Dispatch<React.SetStateAction<boolean>>
) => {
	if (answeredCorrectly == null) {
		return (
			<button
				onClick={() =>
					checkAnswer(
						selectedOptions,
						optionMap,
						showMoreInfoOptions,
						setShowMoreInfoOptions,
						handleSubmit,
						setAnsweredCorrectly,
						minRequired,
						setEmptyAnswer
					)
				}
				className={`${PRIMARY_BUTTON_STYLE}`}
			>
				Submit
			</button>
		);
	} else if (reviewMode) {
		return (
			<>
				<button
					onClick={() => setReviewMode(false)}
					className={`${PRIMARY_BUTTON_STYLE}`}
				>
					Exit Review
				</button>
			</>
		);
	} else if (answeredCorrectly == false) {
		return (
			<>
				<button
					onClick={() => resetProblem()}
					className='min-w-[80px] bg-pink-500 mt-2 mb-2 p-1 md:mt-4 md:mb-4 md:p-2 rounded font-tabs ml-auto drop-shadow-2xl hover:bg-pink-400 active:bg-pink-200 active:shadow-inner transition-all'
				>
					Retry
				</button>
				<button
					onClick={() => setReviewMode(true)}
					className='min-w-[80px] bg-sky-500 mt-2 mb-2 p-1 md:mt-4 md:mb-4 md:p-2 rounded font-tabs ml-auto drop-shadow-2xl hover:bg-sky-400 active:bg-sky-200 active:shadow-inner transition-all'
				>
					Review
				</button>
				<button
					onClick={() => handleNext()}
					className={`${PRIMARY_BUTTON_STYLE}`}
				>
					Next
				</button>
			</>
		);
	} else {
		return (
			<>
				<button
					onClick={() => setReviewMode(true)}
					className='min-w-[80px] bg-sky-500 mt-2 mb-2 p-1 md:mt-4 md:mb-4 md:p-2 rounded font-tabs ml-auto drop-shadow-2xl hover:bg-sky-400 active:bg-sky-200 active:shadow-inner transition-all'
				>
					Review
				</button>
				<button
					onClick={() => handleNext()}
					className={`${PRIMARY_BUTTON_STYLE}`}
				>
					Next
				</button>
			</>
		);
	}
};

// Display options based on the type
export const displayOptions = (
	answeredCorrectly: boolean | null,
	reviewMode: boolean,
	options: Option[],
	problem: VerbalProblem,
	selectedOptions: string[],
	showMoreInfoOptions: Map<string, boolean>,
	setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
	setShowMoreInfoOptions: React.Dispatch<
		React.SetStateAction<Map<string, boolean>>
	>
) => {
	const disableOptions = answeredCorrectly != null && reviewMode == false;

	if (
		problem.framed_as === "MCQSingleAnswer" ||
		problem.framed_as == "SelectSentence" ||
		problem.type == "TextCompletion"
	) {
		return options.map((option, index) => (
			<li
				key={option.value}
				className={`w-full mb-2 mt-2 p-2 hover:cursor-pointer flex flex-wrap items-center ${
					index != options.length - 1
						? "border-b border-slate-200"
						: ""
				}`}
				onClick={() =>
					handleRadioChange(
						option.value,
						setSelectedOptions,
						disableOptions,
						reviewMode,
						setShowMoreInfoOptions
					)
				}
			>
				<input
					type='radio'
					name='options'
					value={option.value}
					className='w-3 h-3 md:w-4 md:h-4 text-sky-600 focus:ring-sky-400 mr-2 ml-2 md:mr-4 md:ml-4 hover:cursor-pointer'
					checked={selectedOptions.includes(option.value)}
					onChange={(e) => e.preventDefault()}
					disabled={disableOptions}
				/>
				<label className='flex-grow w-5/6 hover:cursor-pointer'>
					{!reviewMode
						? option.value
						: processReviewParagraph(
								option.value,
								problem.vocabulary,
								problem.wordmap
						  )}
				</label>
				<p
					className={`${
						option.correct ? "text-sky-700" : "text-pink-700"
					}  ${
						!showMoreInfoOptions.get(option.value)
							? "hidden"
							: "block"
					} w-full font-tabs p-2 rounded mt-2 mb-2`}
				>
					{option.justification}
				</p>
			</li>
		));
	} else {
		// If problem has multiple choices render them as checkboxes
		return options.map((option, index) => (
			<li
				key={option.value}
				className={`w-full mb-2 mt-2 p-2 hover:cursor-pointer flex flex-wrap items-center ${
					index != options.length - 1
						? "border-b border-slate-200"
						: ""
				}`}
				onClick={() =>
					handleCheckboxChange(
						option.value,
						selectedOptions,
						setSelectedOptions,
						disableOptions,
						reviewMode,
						setShowMoreInfoOptions
					)
				}
			>
				<input
					type='checkbox'
					name='options'
					value={option.value}
					className='w-3 h-3 md:w-4 md:h-4 text-sky-600 focus:ring-sky-400 rounded-lg mr-2 ml-2 md:mr-4 md:ml-4 hover:cursor-pointer'
					checked={selectedOptions.includes(option.value)}
					onChange={(e) => e.preventDefault()}
					disabled={disableOptions}
				/>
				<label className='flex-grow w-5/6 hover:cursor-pointer'>
					{!reviewMode
						? option.value
						: processReviewParagraph(
								option.value,
								problem.vocabulary,
								problem.wordmap
						  )}
				</label>
				<p
					className={`${
						option.correct ? "text-sky-700" : "text-pink-700"
					}  ${
						!showMoreInfoOptions.get(option.value) ? "hidden" : ""
					} w-full flex-grow font-tabs p-2 rounded mt-2 mb-2`}
				>
					{option.justification}
				</p>
			</li>
		));
	}
};

export const processReviewParagraph = (
	paragraph: string,
	vocabulary: Word[],
	variations: Map<string, string>
) => {
	if (variations == null) {
		return paragraph;
	}
	const variationMap = new Map(Object.entries(variations));
	// Convert vocabulary array to map for easy access
	const vocabMap = new Map<string, Word>();
	console.log(variationMap);
	vocabulary.forEach((word) => vocabMap.set(word.word, word));
	// Split the paragraph into words
	const words = paragraph.split(" ");

	return words.map((word, index) => {
		if (variationMap.has(removePunctuation(word).toLowerCase())) {
			const baseForm = variationMap.get(
				removePunctuation(word).toLowerCase()
			);
			if (baseForm && vocabMap.has(baseForm)) {
				const vocabWord = vocabMap.get(baseForm);
				if (vocabWord) {
					return (
						<WordDialog
							key={word + index}
							label={word}
							word={vocabWord}
						/>
					);
				}
			}
		} else {
			return word + " ";
		}
	});
};
