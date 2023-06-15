import {
	RandomQuestionRequest,
	VerbalProblem,
} from "@/lib/apitypes/VerbalTypes";
import { useEffect, useRef, useState } from "react";
import VerbalProblemUI from "./VerbalProblemUI";
import {
	getMarkedQuestions,
	getMarkedWords,
	markQuestions,
	markWords,
	unmarkQuestions,
	unmarkWords,
} from "@/lib/api/userRequests";
import {
	addValueToSet,
	getAddedValuesForSet,
	getRemovedValuesForSet,
	removeValueFromSet,
} from "@/lib/helper/general";
import { atom, useAtom } from "jotai";
import { getRandomQuestions } from "@/lib/api/verbalRequests";

// Define global variables for these sets so they can be updated
// from the word dialog component
export const markedWordsAtom = atom<Set<number>>(new Set<number>());
export const initialMarkedWordsAtom = atom<Set<number>>(new Set<number>());

/**
 * Render the Quiz section of the User dashboard.
 * Allows the user to retrieve problems from the API.
 */
const VerbalQuiz = () => {
	const [problems, setProblems] = useState<VerbalProblem[]>([]);
	const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
	const [newProblemsFetched, setNewProblemsFetched] = useState(false);
	const [markedQuestionsSet, setMarkedQuestionsSet] = useState<Set<number>>(
		new Set()
	);
	const [initialMarkedQuestionsSet, setInitialMarkedQuestionsSet] = useState<
		Set<number>
	>(new Set());
	const [markedWordsSet, setMarkedWordsSet] = useAtom(markedWordsAtom);
	const [initialMarkedWordsSet, setInitialMarkedWordsSet] = useAtom(
		initialMarkedWordsAtom
	);
	const markedQuestionsSetRef = useRef<Set<number>>(new Set());
	const markedWordsSetRef = useRef<Set<number>>(new Set());
	const initMarkedQuestionsSetRef = useRef<Set<number>>(new Set());
	const initMarkedWordsSetRef = useRef<Set<number>>(new Set());
	const [request, setRequest] = useState<RandomQuestionRequest>({
		limit: 5,
	});

	const handleProblemCompleted = () => {
		// If there are more problems, go to next. Otherwise, fetch new problems.
		if (currentProblemIndex == problems.length - 1) {
			getRandomQuestions(request).then((problems) => {
				setProblems((oldProblems) => [...oldProblems, ...problems]);
			});
			setNewProblemsFetched(true);
		}
		setCurrentProblemIndex((curr) => curr + 1);
	};

	// Modify handleMarkQuestion to add the question id to the Set of marked questions
	const toggleMarkedQuestion = () => {
		const qid = problems[currentProblemIndex].id;
		if (markedQuestionsSet.has(qid)) {
			setMarkedQuestionsSet(removeValueFromSet(markedQuestionsSet, qid));
		} else {
			setMarkedQuestionsSet(addValueToSet(markedQuestionsSet, qid));
		}
	};

	/**
	 * Update marked questions for user
	 */
	const updateMarkedQuestions = async () => {
		const currentMarkedQuestionsSet = new Set(
			markedQuestionsSetRef.current
		);
		const initialSet = new Set(initMarkedQuestionsSetRef.current);
		const newlyMarkedQuestions = getAddedValuesForSet(
			initialSet,
			currentMarkedQuestionsSet
		);
		const newlyRemovedQuestions = getRemovedValuesForSet(
			initialSet,
			currentMarkedQuestionsSet
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
			markWords(newlyMarkedWords);
		}
		if (newlyRemovedWords.length > 0) {
			unmarkWords(newlyRemovedWords);
		}
		setInitialMarkedWordsSet(currentMarkedWordsSet);
	};

	useEffect(() => {
		updateMarkedQuestions();
		updateMarkedWords();
		setNewProblemsFetched(false);
	}, [newProblemsFetched]);

	// Get marked questions when the component mounts
	useEffect(() => {
		// Fetch data when component  is first mounted
		const fetchData = async () => {
			try {
				// Fetch initial data
				const [markedQuestions, markedWords, problems] =
					await Promise.all([
						getMarkedQuestions(),
						getMarkedWords(),
						getRandomQuestions(request),
					]);
				// Update state with fetched data
				setMarkedQuestionsSet(new Set(markedQuestions));
				setInitialMarkedQuestionsSet(new Set(markedQuestions));
				setMarkedWordsSet(new Set(markedWords));
				setInitialMarkedWordsSet(new Set(markedWords));
				setProblems(problems);
				setCurrentProblemIndex(0);
				setNewProblemsFetched(true);
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

	// Don't render anything if problems haven't loaded yet
	if (!problems[currentProblemIndex]) {
		return null;
	} else {
		return (
			<div>
				{problems ? (
					<VerbalProblemUI
						problem={problems[currentProblemIndex]}
						onProblemCompleted={handleProblemCompleted}
						onToggleMarkQuestion={toggleMarkedQuestion}
						isQuestionMarked={markedQuestionsSet.has(
							problems[currentProblemIndex].id
						)}
					/>
				) : (
					<div>loading</div>
				)}
			</div>
		);
	}
};

export default VerbalQuiz;
