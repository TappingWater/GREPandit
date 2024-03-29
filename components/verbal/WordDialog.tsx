import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Word } from "@/lib/apitypes/VerbalTypes";
import {
	addValueToSet,
	capitalize,
	removeValueFromSet,
	setContainsItem,
} from "@/lib/helper/general";

import { useAtom } from "jotai";
import CheckedButton from "../ui/CheckedButton";
import { markedWordsAtom } from "@/pages/dashboard";

/**
 * Used to render a react component for a modal that is displayed
 */
const WordDialog = ({ label, word }: { label: string; word: Word }) => {
	const [markedWords, setMarkedWords] = useAtom(markedWordsAtom);
	const toggleMarkWord = () => {
		if (markedWords.has(word)) {
			setMarkedWords(removeValueFromSet(markedWords, word));
		} else {
			setMarkedWords(addValueToSet(markedWords, word));
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild className='font-slate-900'>
				<span className='mr-1 text-sky-600 hover:underline hover:decoration-dotted hover:cursor-pointer hover:text-sky-400 transition-all'>
					{label}
				</span>
			</DialogTrigger>
			<DialogContent className='w-[425px] md:w-[55vw] font-slate-900'>
				<DialogHeader className='font-slate-900'>
					<DialogTitle className='text-sky-700'>
						{capitalize(word.word)}
					</DialogTitle>
					<DialogDescription>Definition</DialogDescription>
				</DialogHeader>
				<div className='h-[45vh] overflow-y-auto'>
					{word.meanings.map((meaning, index) => {
						return (
							<div
								className='text-base font-light'
								key={meaning.meaning + index}
							>
								<p className='font-tabs text-sky-600'>
									{capitalize(meaning.type)}
								</p>
								<p className='font-semibold text-slate-700'>
									{meaning.meaning}
								</p>
							</div>
						);
					})}
					{word.examples != null ? (
						<div className='text-pink-700 mt-2 mb-2'>
							Examples:
							<ul className='list-disc font-tabs pl-2 pr-2 text-base'>
								{word.examples.map((ex, index) => {
									return (
										index < 3 && (
											<li key={ex + index}>{ex}</li>
										)
									);
								})}
							</ul>
						</div>
					) : null}
				</div>
				<DialogFooter>
					<CheckedButton
						onClick={toggleMarkWord}
						isChecked={setContainsItem(markedWords, word)}
						checkedText='Marked'
						uncheckedText='Mark word'
						checkedStyles='shadow-inner shadow-sky-500'
						unCheckedStyles='shadow-large shadow-sky-500'
						toolTipText='Marked questions can be reviewed later'
					></CheckedButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default WordDialog;
