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
