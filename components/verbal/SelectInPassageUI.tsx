import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { PRIMARY_BUTTON_STYLE, PARAGRAPH_STYLE } from "@/lib/styles";
import { useState } from "react";

const SelectInPassageUI = ({
	isReviewMode,
	problem,
	handleSubmit,
}: {
	isReviewMode: boolean;
	problem: VerbalProblem;
	handleSubmit: (selectedOptions: string[]) => void;
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
			handleRadioChange(option);
		}
	};

	// Display options based on the type
	const displayOptions = () => {
		return problem.options.map((option, index) => (
			<li
				key={option.value}
				className={`w-full mb-2 mt-2 p-2 hover:cursor-pointer flex items-center ${
					index != problem.options.length - 1
						? "border-b border-slate-200"
						: ""
				}`}
				onClick={() => handleRadioChange(option.value)}
			>
				<input
					type='radio'
					name='options'
					value={option.value}
					className='w-3 h-3 md:w-4 md:h-4 text-sky-600 focus:ring-sky-400 mr-2 ml-2 md:mr-4 md:ml-4 hover:cursor-pointer'
					checked={selectedOptions.includes(option.value)}
					onChange={(e) => {
						e.stopPropagation();
						handleRadioChange(option.value);
					}}
				/>
				<label className='hover:cursor-pointer'>{option.value}</label>
			</li>
		));
	};

	const handleRadioChange = (optionValue: string) => {
		setSelectedOptions([optionValue]);
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
						{sentence}
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
				{displayOptions()}
			</ul>
			<div className='flex justify-end'>
				<button
					onClick={() => handleSubmit(selectedOptions)}
					className={`${PRIMARY_BUTTON_STYLE}`}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default SelectInPassageUI;
