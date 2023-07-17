import { AxiosError } from "axios";
import { sendRequest, IRequestOptions } from "./requests";
import { MarkedQuestionResponse, MarkedWordResponse } from "../apitypes/User";
import { Word } from "../apitypes/VerbalTypes";

/**
 * Create a user when first signs up or logs in if they
 * do not exist
 */
export const createUser = async () => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users`;
	const requestOptions: IRequestOptions = {
		method: "POST",
		url: url,
	};
	try {
		const response = await sendRequest(requestOptions);
		return response;
	} catch (error) {
		const axiosError = error as AxiosError;
		// 409 means user already exists
		if (axiosError.response && axiosError.response.status === 409) {
			return {
				data: "User already exists",
			};
		}
		console.error(`Unable to create user`, error);
		throw error;
	}
};

/**
 * Allows the user to mark words to review for later.
 */
export const markWords = async (wordIds: number[]) => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/marked-words`;
	const data = { words: wordIds };
	const requestOptions: IRequestOptions = {
		method: "POST",
		url: url,
		data: data,
	};
	try {
		const response = await sendRequest(requestOptions);
		return response;
	} catch (error) {
		console.error(`Error marking words:`, error);
		throw error;
	}
};

/**
 * Allows the user to mark words to review for later.
 */
export const markQuestions = async (questionIds: number[]) => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/marked-questions`;
	const data = { questions: questionIds };
	const requestOptions: IRequestOptions = {
		method: "POST",
		url: url,
		data: data,
	};
	try {
		const response = await sendRequest(requestOptions);
		return response;
	} catch (error) {
		console.error(`Error marking questions:`, error);
		throw error;
	}
};

/**
 * Allows the user to retrieve the list of words they have marked to review
 */
export const getMarkedWords = async () => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/marked-words`;
	const requestOptions: IRequestOptions = {
		method: "GET",
		url: url,
	};

	try {
		const response = await sendRequest(requestOptions);
		return response.data.map((item: MarkedWordResponse) => item.word);
	} catch (error) {
		console.error("Unable to get marked words for user");
		throw error;
	}
};

export const getMarkedQuestions = async (): Promise<number[]> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/marked-questions`;
	const requestOptions: IRequestOptions = {
		method: "GET",
		url: url,
	};

	try {
		const response = await sendRequest(requestOptions);
		return response.data.map(
			(item: MarkedQuestionResponse) => item.verbal_question_id
		);
	} catch (error) {
		console.error(`Error getting marked questions:`, error);
		throw error;
	}
};

export const unmarkWords = async (wordIds: number[]) => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/marked-words`;
	const data = { words: wordIds };
	const requestOptions: IRequestOptions = {
		method: "DELETE",
		url: url,
		data: data,
	};
	try {
		const response = await sendRequest(requestOptions);
		return response;
	} catch (error) {
		console.error(`Error unmarking words:`, error);
	}
};

export const unmarkQuestions = async (questionIds: number[]) => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/marked-questions`;
	const data = { questions: questionIds };
	const requestOptions: IRequestOptions = {
		method: "DELETE",
		url: url,
		data: data,
	};
	try {
		const response = await sendRequest(requestOptions);
		return response;
	} catch (error) {
		console.error(`Error unmarking questions:`, error);
		throw error;
	}
};

/**
 * Retrieve the list of words in the questions that the user answered incorrectly
 */
export const getProblematicWords = async (): Promise<Word[]> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/problematic-words`;
	const requestOptions: IRequestOptions = {
		method: "GET",
		url: url,
	};
	try {
		const response = await sendRequest(requestOptions);
		return response.data.map((item: Word) => item);
	} catch (error) {
		console.error(`Unable to get problematic words:`, error);
		throw error;
	}
};
