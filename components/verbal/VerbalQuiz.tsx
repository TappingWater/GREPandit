import {
	RandomQuestionRequest,
	VerbalProblem,
} from "@/lib/apitypes/VerbalTypes";
import { useEffect, useState } from "react";
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
		const newlyMarkedQuestions = getAddedValuesForSet(
			initialMarkedQuestionsSet,
			markedQuestionsSet
		);
		const newlyRemovedQuestions = getRemovedValuesForSet(
			initialMarkedQuestionsSet,
			markedQuestionsSet
		);
		console.log("marking questions");
		console.log(newlyMarkedQuestions);
		console.log(Array.from(markedQuestionsSet));
		console.log("initial" + Array.from(initialMarkedQuestionsSet));
		if (newlyMarkedQuestions.length > 0) {
			markQuestions(newlyMarkedQuestions);
		}
		if (newlyRemovedQuestions.length > 0) {
			unmarkQuestions(newlyRemovedQuestions);
		}
		setInitialMarkedQuestionsSet(new Set(markedQuestionsSet));
	};

	/**
	 * Update marked words for user
	 */
	const updateMarkedWords = async () => {
		const newlyMarkedWords = getAddedValuesForSet(
			initialMarkedWordsSet,
			markedWordsSet
		);
		const newlyRemovedWords = getRemovedValuesForSet(
			initialMarkedWordsSet,
			markedWordsSet
		);
		console.log(newlyMarkedWords);
		console.log("marking");
		if (newlyMarkedWords.length > 0) {
			markWords(newlyMarkedWords);
		}
		if (newlyRemovedWords.length > 0) {
			unmarkWords(newlyRemovedWords);
		}
		setInitialMarkedWordsSet(new Set(markedWordsSet));
	};

	useEffect(() => {
		updateMarkedQuestions();
		updateMarkedWords();
		setNewProblemsFetched(false);
	}, [newProblemsFetched]);

	// Get marked questions when the component mounts
	useEffect(() => {
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
				setInitialMarkedQuestionsSet(new Set(markedWords));
				setProblems(problems);
				setCurrentProblemIndex(0);
				setNewProblemsFetched(true);
			} catch (error) {
				console.error("Error fetching initial data:", error);
			}
		};
		fetchData();
	}, []);

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
