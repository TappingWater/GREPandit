import {
	RandomQuestionRequest,
	VerbalProblem,
	Word,
} from "../apitypes/VerbalTypes";
import { sendRequest, IRequestOptions } from "./requests";

export const getRandomQuestions = async (
	request: RandomQuestionRequest
): Promise<VerbalProblem[]> => {
	const endPoint = `${process.env.NEXT_PUBLIC_API_BASE}/vbquestions/random`;
	try {
		const response = await sendRequest({
			method: "POST",
			url: endPoint,
			data: request,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status === 404) {
			return [];
		} else {
			throw error;
		}
	}
};

export const getAdaptiveQuestions = async (
	qids: number[]
): Promise<VerbalProblem[]> => {
	const endPoint = `${process.env.NEXT_PUBLIC_API_BASE}/vbquestions/adaptive`;
	try {
		const response = await sendRequest({
			method: "GET",
			url: endPoint,
			params: {
				questions: JSON.stringify(qids),
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status === 404) {
			return [];
		} else {
			throw error;
		}
	}
};

export const getQuestionsOnVocab = async (
	qids: number[],
	wordsIds: number[]
): Promise<VerbalProblem[]> => {
	const endPoint = `${process.env.NEXT_PUBLIC_API_BASE}/vbquestions/vocab`;
	try {
		const response = await sendRequest({
			method: "GET",
			url: endPoint,
			params: {
				words: JSON.stringify(wordsIds),
				questions: JSON.stringify(qids),
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status === 404) {
			return [];
		} else {
			throw error;
		}
	}
};

export const getQuestions = async (ids: number[]): Promise<VerbalProblem[]> => {
	const endPoint = `${process.env.NEXT_PUBLIC_API_BASE}/vbquestions`;
	try {
		const response = await sendRequest({
			method: "GET",
			url: endPoint,
			params: {
				ids: JSON.stringify(ids),
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getGeneralWords = async (): Promise<Word[]> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/words/marked`;
	const requestOptions: IRequestOptions = {
		method: "GET",
		url: url,
	};
	try {
		const response = await sendRequest(requestOptions);
		return response.data.map((item: Word) => item);
	} catch (error) {
		throw error;
	}
};
