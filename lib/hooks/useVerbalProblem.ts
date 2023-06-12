import { VerbalProblem, Option } from "@/lib/apitypes/VerbalTypes";
import { useState } from "react";

/**
 * React hook used to manage common state variables for verbal
 * problems
 */
const useVerbalProblem = (
	problem: VerbalProblem,
	handleSubmit: (selectedOptions: string[]) => void,
	handleNext: () => void
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

	const resetProblem = () => {
		setSelectedOptions([]);
		setSelectedAnswers([]);
		setNotificationMsg("");
		setReviewMode(false);
		setOptionJustificationDisplayMap(createInitialInfoMap());
	};

	const handleNextProb = () => {
		handleNext();
		resetProblem();
	};

	const optionMap = problem.options.reduce((map, option) => {
		map.set(option.value, option);
		return map;
	}, new Map<string, Option>());

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
		resetProblem,
		handleNextProb,
		optionMap,
	};
};

export default useVerbalProblem;
