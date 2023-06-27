import { VerbalProblem, Option, Word } from "@/lib/apitypes/VerbalTypes";
import { removePunctuation } from "./general";
import WordDialog from "@/components/verbal/WordDialog";

const PRIMARY_BUTTON_STYLE =
	"min-w-[80px] bg-sky-700 mt-2 mb-2 p-1 md:mt-4 md:mb-4 md:p-2 rounded font-tabs ml-auto drop-shadow-2xl hover:bg-sky-600 active:bg-sky-400 active:shadow-inner transition-all";

/**
 * Helper function that returns a new map object for a given
 * set of options that are selected
 */
export const getJustificationDisplay = (options: string[]) => {
	const optionJustificationMap = new Map<string, boolean>();
	options.map((option) => optionJustificationMap.set(option, true));
	return optionJustificationMap;
};

/**
 * Helper function that returns if the given selected options
 * are correct or not. All correct options have to be chosen without
 * choosing any incorrect options for it to return true
 */
export const isAnswerCorrect = (
	options: string[],
	optionMap: Map<string, Option>
) => {
	const chosenOptions = new Set(options);
	for (let [optionVal, option] of optionMap.entries()) {
		if (chosenOptions.has(optionVal)) {
			// If chosen option is incorrect
			if (!option.correct) {
				return false;
			}
		} else if (option.correct) {
			// If a correct option is not chosen
			return false;
		}
	}
	return true;
};

/**
 * Helper function to check for undefined variables in a sparse function
 */
const hasUndefinedAtRequiredIndex = (arr: any[]) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === undefined) {
			return true;
		}
	}
	return false;
};

/**
 * Function that is called when the user clicks the submit button
 * for a particular verbal problem
 */
export const handleSubmission = (
	minRequired: number,
	selectedOptions: string[],
	optionMap: Map<string, Option>,
	setNotificationMsg: React.Dispatch<React.SetStateAction<string>>,
	setSelectedAnswers: React.Dispatch<React.SetStateAction<string[]>>,
	setOptionJustificationDisplayMap: React.Dispatch<
		React.SetStateAction<Map<string, boolean>>
	>,
	handleSubmit: () => void
) => {
	if (
		selectedOptions.length < minRequired ||
		hasUndefinedAtRequiredIndex(selectedOptions)
	) {
		setNotificationMsg(
			`Invalid submission: Requires ${minRequired} choices at the least`
		);
		return;
	}
	setSelectedAnswers(selectedOptions);
	setOptionJustificationDisplayMap(getJustificationDisplay(selectedOptions));
	if (isAnswerCorrect(selectedOptions, optionMap)) {
		setNotificationMsg("Well done! You answered correctly");
	} else {
		setNotificationMsg("Unfortunately you did not get that quite right");
	}
	handleSubmit();
};

/**
 * Function that is used to render the notification message when
 * the user clicks the submit button
 */
export const renderNotification = (
	notificationMsg: string,
	reviewMode: boolean
) => {
	if (notificationMsg == "" || reviewMode) {
		return;
	}
	if (!notificationMsg.startsWith("Well done!")) {
		return (
			<p className='bg-white text-pink-700 rounded p-2 w-full text-semibold'>
				{notificationMsg}
			</p>
		);
	} else {
		return (
			<p className='bg-white text-sky-700 rounded p-2 w-full text-semibold'>
				{notificationMsg}
			</p>
		);
	}
};

/**
 * Renders the buttons that the user can interact with based
 * on what stage of the problem the user is at.
 */
export const renderButtons = (
	minRequired: number,
	selectedOptions: string[],
	selectedAnswers: string[],
	reviewMode: boolean,
	optionMap: Map<string, Option>,
	setOptionJustificationDisplayMap: React.Dispatch<
		React.SetStateAction<Map<string, boolean>>
	>,
	setNotificationMsg: React.Dispatch<React.SetStateAction<string>>,
	setSelectedAnswers: React.Dispatch<React.SetStateAction<string[]>>,
	setReviewMode: React.Dispatch<React.SetStateAction<boolean>>,
	handleSubmit: () => void,
	handleNext: () => void,
	resetProblem: () => void
) => {
	if (selectedAnswers.length == 0) {
		return (
			<button
				onClick={() =>
					handleSubmission(
						minRequired,
						selectedOptions,
						optionMap,
						setNotificationMsg,
						setSelectedAnswers,
						setOptionJustificationDisplayMap,
						handleSubmit
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
					onClick={() => {
						setReviewMode(false);
						setOptionJustificationDisplayMap(
							getJustificationDisplay(selectedAnswers)
						);
					}}
					className={`${PRIMARY_BUTTON_STYLE}`}
				>
					Exit Review
				</button>
			</>
		);
	} else if (!isAnswerCorrect(selectedAnswers, optionMap)) {
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

/**
 * Renders the option display
 */
export const renderOptions = (
	isRadio: boolean,
	reviewMode: boolean,
	options: Option[],
	problem: VerbalProblem,
	selectedOptions: string[],
	selectedAnswers: string[],
	optionJustificationDisplayMap: Map<string, boolean>,
	handleInputChange: (optionValue: string) => void
) => {
	const disableOptions = selectedAnswers.length != 0 && reviewMode == false;
	return options.map((option, index) => (
		<li
			key={option.value}
			className={`w-full mb-2 mt-2 p-2 hover:cursor-pointer flex flex-wrap items-center ${
				index != options.length - 1 ? "border-b border-slate-200" : ""
			}`}
			onClick={() => handleInputChange(option.value)}
		>
			<input
				type={isRadio ? "radio" : "checkbox"}
				value={option.value}
				className={
					isRadio
						? "w-3 h-3 md:w-4 md:h-4 text-sky-600 focus:ring-sky-400 mr-2 ml-2 md:mr-4 md:ml-4 hover:cursor-pointer"
						: "w-3 h-3 md:w-4 md:h-4 text-sky-600 focus:ring-sky-400 rounded-lg mr-2 ml-2 md:mr-4 md:ml-4 hover:cursor-pointer"
				}
				checked={
					disableOptions
						? selectedAnswers.includes(option.value)
						: selectedOptions.includes(option.value)
				}
				onChange={(e) => e.preventDefault()}
				disabled={disableOptions}
			/>
			<label className='flex-grow w-5/6 hover:cursor-pointer'>
				{!reviewMode
					? option.value
					: renderReviewVocab(
							option.value,
							problem.vocabulary,
							problem.wordmap
					  )}
			</label>
			<p
				className={`${
					option.correct ? "text-sky-700" : "text-pink-700"
				}  ${
					!optionJustificationDisplayMap.get(option.value)
						? "hidden"
						: "block"
				} w-full font-tabs p-2 rounded mt-2 mb-2`}
			>
				{option.justification}
			</p>
		</li>
	));
};

/**
 * Renders the word dialog for the inspect mode
 */
export const renderReviewVocab = (
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
