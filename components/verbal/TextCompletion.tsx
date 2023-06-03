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

const TextCompletionUI = ({
	isReviewMode,
	problem,
	handleSubmit,
}: {
	isReviewMode: boolean;
	problem: VerbalProblem;
	handleSubmit: (selectedOptions: string[]) => void;
}) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const handleSelectChange = (index: number, value: string) => {
		let newSelectedOptions = [...selectedOptions];
		newSelectedOptions[index] = value;
		setSelectedOptions(newSelectedOptions);
		console.log(newSelectedOptions);
	};

	const splitParagraphIntoBlanks = (paragraph?: string) => {
		return paragraph ? paragraph.split("{BLANK}") : [];
	};

	const blanks = splitParagraphIntoBlanks(problem.paragraph!.String);
	const numberOfBlanks = blanks ? blanks.length - 1 : 0;
	const numberOfOptionsPerBlank = numberOfBlanks === 1 ? 5 : 3;

	const generateParagraphWithBlanks = () => {
		return (
			<p className={`${PARAGRAPH_STYLE} p-2 md:p-4 leading-8`}>
				{blanks.map((blank, index) => (
					<span key={index} className='font-tabs'>
						{blank}
						{index < numberOfBlanks && (
							<Select
								onValueChange={(value) =>
									handleSelectChange(index, value)
								}
							>
								<SelectTrigger className='ml-2 mr-2 inline-flex h-[25px] w-[140px] text-sm border-none bg-white text-slate-900 font-semibold'>
									<SelectValue placeholder='Select a word' />
								</SelectTrigger>
								<SelectContent>
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

	return (
		<div className='text-sm md:text-base'>
			{blanks && generateParagraphWithBlanks()}
			<p className={`${PARAGRAPH_STYLE} font-semibold`}>
				{problem.question}
			</p>
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

export default TextCompletionUI;
