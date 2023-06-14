import { RandomQuestionRequest } from "../apitypes/VerbalTypes";
import { sendRequest } from "./requests";

export const getRandomQuestions = async (request: RandomQuestionRequest) => {
	const endPoint = `${process.env.NEXT_PUBLIC_API_BASE}/vbquestions/random`;
	const response = await sendRequest({
		method: "POST",
		url: endPoint,
		data: request,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};
