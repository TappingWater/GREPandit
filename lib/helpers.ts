export const insertSpacesBeforeCapitals = (inputString: string) => {
	return inputString.replace(/([A-Z])/g, " $1").trim();
};

export const removePunctuation = (inputString: string) => {
	return inputString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
};

export const capitalize = (inputString: string) => {
	return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

// normalize text
export const normalizeText = (text: string) => {
	const noPunctutation = removePunctuation(text);
	return noPunctutation.toLowerCase().trim();
};
