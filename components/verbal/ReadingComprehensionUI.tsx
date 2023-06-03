import { useState } from "react";
import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { PRIMARY_BUTTON_STYLE, PARAGRAPH_STYLE } from "@/lib/styles";

/**
 * Child component used by the Verbal Problem UI to
 * render verbal problems of type reading comprehension.
 * If review mode is enabled allows user to check for justification
 * and highlights complex words and allows them to mark it for review
 */
const ReadingComprehensionUI = ({
	isReviewMode,
	problem,
	handleSubmit,
}: {
	isReviewMode: boolean;
	problem: VerbalProblem;
	handleSubmit: (selectedOptions: string[]) => void;
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	// Update selected options for MCQMultipleChoice type
	const handleCheckboxChange = (optionValue: string) => {
		if (selectedOptions.includes(optionValue)) {
			setSelectedOptions(
				selectedOptions.filter((opt) => opt !== optionValue)
			);
		} else {
			setSelectedOptions([...selectedOptions, optionValue]);
		}
	};

	// Update selected option for MCQSingleAnswer type
	const handleRadioChange = (optionValue: string) => {
		setSelectedOptions([optionValue]);
	};

	// Display options based on the type
	const displayOptions = (framedAs: string, options: Option[]) => {
		if (framedAs === "MCQSingleAnswer") {
			return options.map((option, index) => (
				<li
					key={option.value}
					className={`w-full mb-2 mt-2 p-2 hover:cursor-pointer flex items-center ${
						index != options.length - 1
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
					<label className='hover:cursor-pointer'>
						{option.value}
					</label>
				</li>
			));
		} else {
			// If problem has multiple choices render them as checkboxes
			return options.map((option, index) => (
				<li
					key={option.value}
					className={`w-full mb-2 mt-2 p-2 hover:cursor-pointer flex items-center ${
						index != options.length - 1
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
					<label className='hover:cursor-pointer'>
						{option.value}
					</label>
				</li>
			));
		}
	};

	return (
		<div className='text-sm md:text-base'>
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{problem.paragraph?.String}
			</p>
			<p className={`${PARAGRAPH_STYLE} font-semibold`}>
				{problem.question}
			</p>
			<ul className='bg-white text-black rounded-lg mt-2 mb-2 md:mt-4 md:mb-4 p-2'>
				{displayOptions(problem.framed_as, problem.options)}
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

export default ReadingComprehensionUI;
