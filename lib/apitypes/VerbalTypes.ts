// Define types to be used with the API

/**
 * Verbal Problem type returned by the API
 */
export type VerbalProblem = {
	id: number;
	competence: string;
	framed_as: string;
	type: string;
	paragraph: string;
	question: string;
	options: Option[];
	difficulty: string;
	vocabulary: Word[];
	wordmap: Map<string, string>;
};

/**
 * Represents a word retrieved from the API
 */
export type Word = {
	id: number;
	word: string;
	meanings: Meaning[];
	examples: string[];
	marked: boolean;
};

/**
 * Represents a single meaning in the word retrieved
 * from the API
 */
export type Meaning = {
	meaning: string;
	type: string;
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

/**
 * Interface to define the req body to be passed
 * to the API
 */
export type RandomQuestionRequest = {
	limit: number;
	type?: string;
	competence?: string;
	framed_as?: string;
	difficulty?: string;
	exclude_ids?: number[];
};

/**
 * Type used to represent the type of request
 * to be passed when creating a new verbal stat
 */
export type VerbalStatRequest = {
	question_id: number;
	correct: boolean;
	answers: string[];
	duration: number;
};

/**
 * Type used to represent a verbal stat datapoint
 * for a particular user
 */
export type VerbalStat = {
	question_id: number;
	correct: boolean;
	answers: string[];
	duration: number;
	time: string;
	competence: string;
	framed_as: string;
	type: string;
	difficulty: string;
	vocabulary: Word[];
};
