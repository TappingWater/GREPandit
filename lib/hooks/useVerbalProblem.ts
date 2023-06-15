import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { useState } from "react";
import { createVerbalStat } from "../api/verbalStatRequests";
import { isAnswerCorrect } from "../helper/verbal";

/**
 * React hook used to manage common state variables for verbal
 * problems
 */
const useVerbalProblem = (
	problem: VerbalProblem,
	handleSubmit: (
		selectedOptions: string[],
		optionMap: Map<string, Option>
	) => void,
	handleNext: () => void,
	handleRetry: () => void
) => {
	const createInitialInfoMap = () => {
		const infoMap = new Map<string, boolean>();
		problem.options.map((option) => infoMap.set(option.value, false));
		return infoMap;
	};
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const [reviewMode, setReviewMode] = useState<boolean>(false);
	const [notificationMsg, setNotificationMsg] = useState<string>("");
	const [optionJustificationDisplayMap, setOptionJustificationDisplayMap] =
		useState<Map<string, boolean>>(createInitialInfoMap());
	const optionMap = problem.options.reduce((map, option) => {
		map.set(option.value, option);
		return map;
	}, new Map<string, Option>());

	const resetProblem = () => {
		setSelectedOptions([]);
		setSelectedAnswers([]);
		setNotificationMsg("");
		setReviewMode(false);
		setOptionJustificationDisplayMap(createInitialInfoMap());
	};

	const handleRetryProb = () => {
		handleRetry();
		resetProblem();
	};

	const handleNextProb = () => {
		handleNext();
		resetProblem();
	};

	const handleSubmitProb = () => {
		handleSubmit(selectedOptions, optionMap);
	};

	return {
		selectedOptions,
		setSelectedOptions,
		selectedAnswers,
		setSelectedAnswers,
		notificationMsg,
		setNotificationMsg,
		reviewMode,
		setReviewMode,
		optionJustificationDisplayMap,
		setOptionJustificationDisplayMap,
		handleSubmitProb,
		handleRetryProb,
		handleNextProb,
		optionMap,
	};
};

export default useVerbalProblem;
