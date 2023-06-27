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
	let attempts = 0;
	const intervalId = setInterval(async () => {
		attempts++;
		try {
			const response = await sendRequest(requestOptions);
			clearInterval(intervalId);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError;
			// 409 means user already exists
			if (axiosError.response && axiosError.response.status === 409) {
				return {
					data: "User already exists",
				};
			}
			console.error(`Error on attempt ${attempts} to mark words:`, error);
			if (attempts >= 3) {
				clearInterval(intervalId);
				throw new Error("Could not mark words after 3 attempts");
			}
		}
	}, 30 * 1000);
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
	let attempts = 0;
	const intervalId = setInterval(async () => {
		attempts++;
		try {
			const response = await sendRequest(requestOptions);
			clearInterval(intervalId);
			return response;
		} catch (error) {
			console.error(`Error on attempt ${attempts} to mark words:`, error);
			if (attempts >= 3) {
				clearInterval(intervalId);
				throw new Error("Could not mark words after 3 attempts");
			}
		}
	}, 30 * 1000);
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
	let attempts = 0;
	const intervalId = setInterval(async () => {
		attempts++;
		try {
			const response = await sendRequest(requestOptions);
			clearInterval(intervalId);
			return response;
		} catch (error) {
			console.error(
				`Error on attempt ${attempts} to mark questions:`,
				error
			);
			if (attempts >= 3) {
				clearInterval(intervalId);
				throw new Error("Could not mark words after 3 attempts");
			}
		}
	}, 30 * 1000);
};

/**
 * Allows the user to retrieve the list of words they have marked to review
 */
export const getMarkedWords = async (attempts = 0): Promise<Word[]> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/marked-words`;
	const requestOptions: IRequestOptions = {
		method: "GET",
		url: url,
	};

	try {
		const response = await sendRequest(requestOptions);
		return response.data.map((item: MarkedWordResponse) => item.word);
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
		return getMarkedWords(attempts + 1);
	}
};

export const getMarkedQuestions = async (attempts = 0): Promise<number[]> => {
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
		console.error(
			`Error on attempt ${attempts} to get marked questions:`,
			error
		);
		if (attempts >= 3) {
			throw new Error("Could not get marked questions after 3 attempts");
		}
		// Wait for 30 seconds before trying again
		await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
		return getMarkedQuestions(attempts + 1);
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
	let attempts = 0;
	const intervalId = setInterval(async () => {
		attempts++;
		try {
			const response = await sendRequest(requestOptions);
			clearInterval(intervalId);
			return response;
		} catch (error) {
			console.error(
				`Error on attempt ${attempts} to unmark words:`,
				error
			);
			if (attempts >= 3) {
				clearInterval(intervalId);
				throw new Error("Could not unmark words after 3 attempts");
			}
		}
	}, 30 * 1000);
};

export const unmarkQuestions = async (questionIds: number[]) => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/marked-questions`;
	const data = { questions: questionIds };
	const requestOptions: IRequestOptions = {
		method: "DELETE",
		url: url,
		data: data,
	};
	let attempts = 0;
	const intervalId = setInterval(async () => {
		attempts++;
		try {
			const response = await sendRequest(requestOptions);
			clearInterval(intervalId);
			return response;
		} catch (error) {
			console.error(
				`Error on attempt ${attempts} to unmark questions:`,
				error
			);
			if (attempts >= 3) {
				clearInterval(intervalId);
				throw new Error("Could not unmark questions after 3 attempts");
			}
		}
	}, 30 * 1000);
};

/**
 * Retrieve the list of words in the questions that the user answered incorrectly
 */
export const getProblematicWords = async (attempts = 0): Promise<Word[]> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/problematic-words`;
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
		return getMarkedWords(attempts + 1);
	}
};
