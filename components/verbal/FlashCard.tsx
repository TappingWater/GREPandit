import React, { useState } from "react";
import { motion } from "framer-motion";
import { Word } from "@/lib/apitypes/VerbalTypes";
import {
	addValueToSet,
	capitalize,
	removeValueFromSet,
	setContainsItem,
} from "@/lib/helper/general";
import ListAccordion from "../ui/ListAccordion";
import { useAtom } from "jotai";
import CheckedButton from "../ui/CheckedButton";
import { markedWordsAtom } from "@/pages/verbal";

const FlashCard = ({ word }: { word: Word }) => {
	const [markedWords, setMarkedWords] = useAtom(markedWordsAtom);
	const toggleMarkWord = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (setContainsItem(markedWords, word)) {
			setMarkedWords(removeValueFromSet(markedWords, word));
			setIsFlipped(false);
		} else {
			setMarkedWords(addValueToSet(markedWords, word));
		}
	};

	const [isFlipped, setIsFlipped] = useState(false);
	const containerVariants = {
		front: { rotateY: 0 },
		back: { rotateY: 180 },
	};

	const contentVariants = {
		front: { rotateY: 0 },
		back: { rotateY: -180 },
	};

	const displayFront = () => {
		return (
			<div className='min-h-[250px] w-full flex justify-center items-center text-2xl font-heading text-sky-900'>
				{capitalize(word.word)}
			</div>
		);
	};

	const displayBack = () => {
		return (
			<>
				<h3 className='font-heading text-md text-sky-800'>
					Definitions:
				</h3>
				{word.meanings.map((meaning, index) => {
					return (
						<div
							className='font-light'
							key={meaning.meaning + index}
						>
							<p className='font-tabs text-sky-500 text-xs'>
								{capitalize(meaning.type)}
							</p>
							<p className='font-semibold text-slate-700'>
								{capitalize(meaning.meaning)}
							</p>
						</div>
					);
				})}
				<ListAccordion header='Examples:' content={word.examples} />
				<div
					style={{ flexGrow: 1 }}
					className='flex-grow flex justify-end items-end w-full'
				>
					<CheckedButton
						onClick={(e) => toggleMarkWord(e)}
						isChecked={setContainsItem(markedWords, word)}
						checkedText='Marked'
						uncheckedText='Mark word'
						checkedStyles='shadow-inner shadow-sky-500'
						unCheckedStyles='shadow-large shadow-sky-500'
						toolTipText='Marked questions can be reviewed later'
					></CheckedButton>
				</div>
			</>
		);
	};

	return (
		<motion.div
			className='max-w-[80%] bg-white rounded-sm w-[450px] md:w-[500px] min-h-[250px] text-black border-2 border-sky-300'
			onClick={() => setIsFlipped(!isFlipped)}
			animate={isFlipped ? "back" : "front"}
			variants={containerVariants}
			transition={{ duration: 0.6, ease: "easeOut" }}
			style={{ perspective: 1000 }} // Add perspective
		>
			<motion.div
				variants={contentVariants}
				transition={{ duration: 0.1, ease: "easeOut" }}
				className='p-4 flex w-full h-[300px] flex-col overflow-auto'
			>
				{!isFlipped ? displayFront() : displayBack()}
			</motion.div>
		</motion.div>
	);
};

export default FlashCard;
