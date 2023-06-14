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
} from "@/lib/helper/general";
import { markedWordsAtom } from "./VerbalQuiz";
import { useAtom } from "jotai";
import CheckedButton from "../ui/CheckedButton";

/**
 * Used to render a react component for a modal that is displayed
 */
const WordDialog = ({ label, word }: { label: string; word: Word }) => {
	const [markedWords, setMarkedWords] = useAtom(markedWordsAtom);
	const toggleMarkWord = () => {
		if (markedWords.has(word.id)) {
			setMarkedWords(removeValueFromSet(markedWords, word.id));
		} else {
			setMarkedWords(addValueToSet(markedWords, word.id));
		}
	};

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
					<CheckedButton
						onClick={toggleMarkWord}
						isChecked={markedWords.has(word.id)}
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
