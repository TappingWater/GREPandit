import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { PRIMARY_BUTTON_STYLE, PARAGRAPH_STYLE } from "@/lib/styles";
import { useState } from "react";

const SentenceEquivalanceUI = ({
	isReviewMode,
	problem,
	handleSubmit,
}: {
	isReviewMode: boolean;
	problem: VerbalProblem;
	handleSubmit: (selectedOptions: string[]) => void;
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	// Update selected options for Sentence equivalance
	// If 2 options are already selected removes the first one
	const handleCheckboxChange = (optionValue: string) => {
		if (selectedOptions.includes(optionValue)) {
			setSelectedOptions(
				selectedOptions.filter((opt) => opt !== optionValue)
			);
		} else {
			if (selectedOptions.length >= 2) {
				setSelectedOptions((prevOptions) => [
					prevOptions[1], // keep the last selected option
					optionValue, // add the new option
				]);
			} else {
				setSelectedOptions((prevOptions) => [
					...prevOptions, // keep the existing options
					optionValue, // add the new option
				]);
			}
		}
	};

	// Display options based on the type
	const displayOptions = () => {
		// If problem has multiple choices render them as checkboxes
		return problem.options.map((option, index) => (
			<li
				key={option.value}
				className={`w-full mb-2 mt-2 p-2 hover:cursor-pointer flex items-center ${
					index != problem.options.length - 1
						? "border-b border-slate-200"
						: ""
				}`}
				onClick={() => handleCheckboxChange(option.value)}
			>
				<input
					type='checkbox'
					name='options'
					value={option.value}
					className='w-3 h-3 md:w-4 md:h-4 text-sky-600 focus:ring-sky-400 rounded-lg mr-2 ml-2 md:mr-4 md:ml-4 hover:cursor-pointer'
					checked={selectedOptions.includes(option.value)}
					onChange={(e) => {
						e.stopPropagation();
						handleCheckboxChange(option.value);
					}}
				/>
				<label className='hover:cursor-pointer'>{option.value}</label>
			</li>
		));
	};

	return (
		<div className='text-sm md:text-base'>
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{problem.paragraph?.String.replaceAll(
					"{BLANK}",
					".............................."
				)}
			</p>
			<p className={`${PARAGRAPH_STYLE} font-semibold`}>
				{problem.question}
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

export default SentenceEquivalanceUI;
