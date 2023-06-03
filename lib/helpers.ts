export function insertSpacesBeforeCapitals(inputString: string) {
	return inputString.replace(/([A-Z])/g, " $1").trim();
}
