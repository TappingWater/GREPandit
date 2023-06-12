import { VerbalProblem } from "@/lib/apitypes/VerbalTypes";
import { useCallback, useEffect, useState } from "react";
import VerbalProblemUI from "./VerbalProblemUI";
import { sendRequest } from "@/lib/sendRequest";

/**
 * Interface to define the req body to be passed
 * to the API
 */
interface RandomQuestionRequest {
	limit: number;
	type?: string;
	competence?: string;
	framed_as?: string;
	difficulty?: string;
	exclude_ids?: number[];
}

/**
 * Render the Quiz section of the User dashboard.
 * Allows the user to retrieve problems from the API.
 */
const VerbalQuiz = () => {
	const [problems, setProblems] = useState<VerbalProblem[]>([]);
	const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
	const [data, setData] = useState<RandomQuestionRequest>({
		limit: 5,
		type: "SentenceEquivalence",
	});
	const endPoint = `${process.env.NEXT_PUBLIC_API_BASE}/vbquestions/random`;

	/**
	 * API request used to retrieve problems to be displayed to the
	 * user
	 */
	const fetchProblems = useCallback(
		async (data: RandomQuestionRequest) => {
			const response = await sendRequest({
				method: "POST",
				url: endPoint,
				data: data,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setProblems(response.data);
			setCurrentProblemIndex(0);
		},
		[endPoint]
	);

	useEffect(() => {
		fetchProblems(data);
	}, [fetchProblems, data]);

	const handleProblemCompleted = () => {
		// If there are more problems, go to next. Otherwise, fetch new problems.
		console.log(currentProblemIndex);
		if (currentProblemIndex < problems.length - 1) {
			setCurrentProblemIndex((curr) => curr + 1);
			console.log(problems);
		} else {
			fetchProblems(data);
		}
	};

	// Don't render anything if problems haven't loaded yet
	if (!problems) {
		return null;
	} else {
		return (
			<div>
				{problems ? (
					<VerbalProblemUI
						problem={problems[currentProblemIndex]}
						onProblemCompleted={handleProblemCompleted}
					/>
				) : (
					<div>loading</div>
				)}
			</div>
		);
	}
};

export default VerbalQuiz;
