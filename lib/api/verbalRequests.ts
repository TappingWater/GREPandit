import { RandomQuestionRequest, Word } from "../apitypes/VerbalTypes";
import { sendRequest, IRequestOptions } from "./requests";

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

export const getGeneralWords = async (attempts = 0): Promise<Word[]> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/words/marked`;
	const requestOptions: IRequestOptions = {
		method: "GET",
		url: url,
	};

	try {
		const response = await sendRequest(requestOptions);
		return response.data.map((item: Word) => item);
	} catch (error) {
		console.error(
			`Error on attempt ${attempts} to get marked questions:`,
			error
		);
		if (attempts >= 3) {
			throw new Error("Could not get marked questions after 3 attempts");
		}
		// Wait for 30 seconds before trying again
		await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
		return getGeneralWords(attempts + 1);
	}
};
