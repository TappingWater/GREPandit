import { Word } from "@/lib/apitypes/VerbalTypes";
import React, { useState } from "react";
import FlashCard from "./FlashCard";
import { motion, AnimatePresence, useCycle } from "framer-motion";

const CardCarousel = ({ words }: { words: Word[] }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [touchStart, setTouchStart] = useState(0);

	const handleNext = () => {
		setActiveIndex((activeIndex + 1) % words.length);
	};

	const handlePrev = () => {
		setActiveIndex((activeIndex - 1 + words.length) % words.length);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.changedTouches[0].clientX);
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		// Swipe Threshold
		const threshold = 100;
		const touchEnd = e.changedTouches[0].clientX;
		if (Math.abs(touchStart - touchEnd) > threshold) {
			// Left swipe
			if (touchStart - touchEnd > 0) {
				handleNext();
			}
			// Right swipe
			if (touchStart - touchEnd < 0) {
				handlePrev();
			}
		}
		// Reset touch coordinates
		setTouchStart(0);
	};

	return (
		<div
			className='relative p-8 pb-32 h-full w-full flex flex-1 justify-center items-center overflow-hidden'
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<button
				className='bg-white rounded-full pl-1 pr-1 text-sky-700 w-[30px] font-bold hover:text-white hover:bg-slate-600 transition-all'
				onClick={handlePrev}
			>
				&lt;
			</button>
			<AnimatePresence mode='wait' initial={false}>
				<motion.div
					key={activeIndex}
					initial={{ opacity: 0, x: 300 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -300 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className='w-full h-full flex items-center justify-center'
				>
					<FlashCard word={words[activeIndex]} />
				</motion.div>
			</AnimatePresence>
			<button
				className='bg-white rounded-full text-sky-700 w-[30px] pl-1 pr-1 font-bold hover:text-white hover:bg-slate-600 transition-all'
				onClick={handleNext}
			>
				&gt;
			</button>
		</div>
	);
};

export default CardCarousel;
