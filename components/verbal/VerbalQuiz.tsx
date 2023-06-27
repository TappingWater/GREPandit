import {
	RandomQuestionRequest,
	VerbalProblem,
} from "@/lib/apitypes/VerbalTypes";
import { useEffect, useState } from "react";
import VerbalProblemUI from "./VerbalProblemUI";
import { getRandomQuestions } from "@/lib/api/verbalRequests";

/**
 * Render the Quiz section of the User dashboard.
 * Allows the user to retrieve problems from the API.
 */
const VerbalQuiz = () => {
	const [problems, setProblems] = useState<VerbalProblem[]>([]);
	const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

	const [request, setRequest] = useState<RandomQuestionRequest>({
		limit: 5,
		type: "ReadingComprehension",
	});

	const handleProblemCompleted = () => {
		// If there are more problems, go to next. Otherwise, fetch new problems.
		if (currentProblemIndex == problems.length - 1) {
			getRandomQuestions(request).then((problems) => {
				console.log(problems);
				setProblems((oldProblems) => [...oldProblems, ...problems]);
			});
		}
		setCurrentProblemIndex((curr) => curr + 1);
	};

	// Don't render anything if problems haven't loaded yet
	if (!problems[currentProblemIndex]) {
		return null;
	} else {
		return (
			<VerbalProblemUI
				problem={problems[currentProblemIndex]}
				onProblemCompleted={handleProblemCompleted}
			/>
		);
	}
};

export default VerbalQuiz;
