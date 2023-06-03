// Define types to be used with the API

/**
 * Verbal Problem type returned by the API
 */
export type VerbalProblem = {
	id: number;
	competence: string;
	framed_as: string;
	type: string;
	paragraph?: {
		String: string;
		Valid: boolean;
	};
	question: string;
	options: Option[];
	answer: null;
	explanation: string;
	difficulty: string;
	vocabulary: Word[];
};

/**
 * Represents a word retrieved from the API
 */
export type Word = {
	id: number;
	word: string;
	meanings: Meaning[];
};

/**
 * Represents a single meaning in the word retrieved
 * from the API
 */
export type Meaning = {
	meaning: string;
	examples: string[];
	type: string;
	synonyms: string[];
};

/**
 * Represents a single option that can be selected from
 * the API
 */
export type Option = {
	value: string;
	correct: boolean;
	justification: string;
};
