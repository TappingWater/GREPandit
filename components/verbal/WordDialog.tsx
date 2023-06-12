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
import { capitalize } from "@/lib/helpers";

const PRIMARY_BUTTON_STYLE =
	"min-w-[80px] bg-sky-700 mt-2 mb-2 p-1 md:mt-4 md:mb-4 md:p-2 rounded font-tabs ml-auto drop-shadow-2xl hover:bg-sky-600 active:bg-sky-400 active:shadow-inner transition-all";

/**
 * Used to render a react component for a modal that is displayed
 */
const WordDialog = ({ label, word }: { label: string; word: Word }) => {
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

export default WordDialog;
