import { VerbalStat, VerbalStatRequest } from "../apitypes/VerbalTypes";
import { sendRequest } from "./requests";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE}/verbal-stats`;

export const createVerbalStat = async (
	questionId: number,
	correct: boolean,
	answers: string[],
	duration: number
) => {
	const request: VerbalStatRequest = {
		question_id: questionId,
		correct: correct,
		answers: answers,
		duration: duration,
	};
	const endPoint = baseUrl;
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

export const getVerbalStats = async (): Promise<VerbalStat[]> => {
	const endPoint = baseUrl;
	const response = await sendRequest({
		method: "GET",
		url: endPoint,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
};
