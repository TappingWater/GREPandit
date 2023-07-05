import { WithAuth, UserPageProps } from "@/components/WithAuth";
import Verbal from "@/components/overview/Verbal";
import ReviewUI from "@/components/verbal/ReviewUI";
import VerbalQuiz from "@/components/verbal/VerbalQuiz";
import VerbalStatUI from "@/components/verbal/VerbalStat";
import {
	getMarkedQuestions,
	getMarkedWords,
	markQuestions,
	markWords,
	unmarkQuestions,
	unmarkWords,
} from "@/lib/api/userRequests";
import { getVerbalStats } from "@/lib/api/verbalStatRequests";
import { VerbalStat, Word } from "@/lib/apitypes/VerbalTypes";
import {
	getAddedValuesForSet,
	getRemovedValuesForSet,
} from "@/lib/helper/general";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

// Define global variables for these sets so they can be updated
// from the word dialog component
export const markedWordsAtom = atom<Set<Word>>(new Set<Word>());
export const initialMarkedWordsAtom = atom<Set<Word>>(new Set<Word>());
export const markedQuestionsAtom = atom<Set<number>>(new Set<number>());
export const initialMarkedQuestionsAtom = atom<Set<number>>(new Set<number>());
export const userVbStats = atom<VerbalStat[]>([]);
/**
 * Page that renders the sub tabs for the verbal page
 */
const VerbalPage: React.FC<UserPageProps> = () => {
	const router = useRouter();
	const { tab } = router.query;

	// Keep track of questions marked by the user
	const [markedQuestionsSet, setMarkedQuestionsSet] =
		useAtom(markedQuestionsAtom);
	const [initialMarkedQuestionsSet, setInitialMarkedQuestionsSet] = useAtom(
		initialMarkedQuestionsAtom
	);
	// Keep track of words marked by the user
	const [markedWordsSet, setMarkedWordsSet] = useAtom(markedWordsAtom);
	const [initialMarkedWordsSet, setInitialMarkedWordsSet] = useAtom(
		initialMarkedWordsAtom
	);
	const markedQuestionsSetRef = useRef<Set<number>>(new Set());
	const markedWordsSetRef = useRef<Set<Word>>(new Set());
	const initMarkedQuestionsSetRef = useRef<Set<number>>(new Set());
	const initMarkedWordsSetRef = useRef<Set<Word>>(new Set());
	const [userStats, setStats] = useAtom(userVbStats);

	/**
	 * Update marked questions for user
	 */
	const updateMarkedQuestions = async () => {
		const currentMarkedQuestionsSet = new Set(
			markedQuestionsSetRef.current
		);
		const initialSet = new Set(initMarkedQuestionsSetRef.current);
		const newlyMarkedQuestions = Array.from(
			currentMarkedQuestionsSet
		).filter((id) => !initialSet.has(id));
		const newlyRemovedQuestions = Array.from(initialSet).filter(
			(id) => !initialSet.has(id)
		);
		if (newlyMarkedQuestions.length > 0) {
			markQuestions(newlyMarkedQuestions);
		}
		if (newlyRemovedQuestions.length > 0) {
			unmarkQuestions(newlyRemovedQuestions);
		}
		setInitialMarkedQuestionsSet(new Set(currentMarkedQuestionsSet));
	};

	/**
	 * Update marked words for user
	 */
	const updateMarkedWords = async () => {
		const currentMarkedWordsSet = new Set(markedWordsSetRef.current);
		const initialSet = new Set(initMarkedWordsSetRef.current);
		const newlyMarkedWords = getAddedValuesForSet(
			initialSet,
			currentMarkedWordsSet
		);
		const newlyRemovedWords = getRemovedValuesForSet(
			initialSet,
			currentMarkedWordsSet
		);
		if (newlyMarkedWords.length > 0) {
			markWords(newlyMarkedWords.map((w) => w.id));
		}
		if (newlyRemovedWords.length > 0) {
			unmarkWords(newlyRemovedWords.map((w) => w.id));
		}
		setInitialMarkedWordsSet(currentMarkedWordsSet);
	};

	// Update the references when needed
	useEffect(() => {
		markedQuestionsSetRef.current = markedQuestionsSet;
	}, [markedQuestionsSet]);

	useEffect(() => {
		markedWordsSetRef.current = markedWordsSet;
	}, [markedWordsSet]);

	useEffect(() => {
		initMarkedQuestionsSetRef.current = initialMarkedQuestionsSet;
	}, [initialMarkedQuestionsSet]);

	useEffect(() => {
		initMarkedWordsSetRef.current = initialMarkedWordsSet;
	}, [initialMarkedWordsSet]);

	// Update the words and questions on the server when component unloads
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch initial data
				const [markedQuestions, markedWords, userStats] =
					await Promise.all([
						getMarkedQuestions(),
						getMarkedWords(),
						getVerbalStats(),
					]);
				// Update state with fetched data
				setMarkedQuestionsSet(new Set(markedQuestions));
				setInitialMarkedQuestionsSet(new Set(markedQuestions));
				setMarkedWordsSet(new Set(markedWords));
				setInitialMarkedWordsSet(new Set(markedWords));
				setStats(userStats);
			} catch (error) {
				console.error("Error fetching initial data:", error);
			}
		};
		fetchData();

		// Clean up function
		return () => {
			(async () => {
				try {
					updateMarkedQuestions();
					updateMarkedWords();
				} catch (error) {
					console.error(error);
				}
			})();
		};
	}, []);

	const renderSubTab = () => {
		console.log(tab);
		if (tab == null) {
			return <VerbalQuiz></VerbalQuiz>;
		} else if (tab == "quiz") {
			return <VerbalQuiz></VerbalQuiz>;
		} else if (tab == "stats") {
			return <VerbalStatUI></VerbalStatUI>;
		} else if (tab == "review") {
			return <ReviewUI></ReviewUI>;
		} else if (tab == "overview") {
			return <Verbal></Verbal>;
		}
	};

	return <div className='md:min-h-[calc(100vh-190px)]'>{renderSubTab()}</div>;
};

export default WithAuth(VerbalPage);
