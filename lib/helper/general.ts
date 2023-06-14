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

// Add value to a set which is a state variable
// In react unless you are using primitive or array, objects
// such as sets need to be created newly to trigger a rerender
export function addValueToSet<T>(set: Set<T>, value: T): Set<T> {
	const newSet = new Set(set);
	newSet.add(value);
	return newSet;
}

// Add values as an array to a set which is a state variable
export function addValuesToSet<T>(set: Set<T>, values: T[]): Set<T> {
	const newSet = new Set(set);
	values.forEach((value) => newSet.add(value));
	return newSet;
}

// Remove a value from a set which is a state variable
// In react unless you are using primitive or array, objects
// such as sets need to be created newly to trigger a rerender
export function removeValueFromSet<T>(set: Set<T>, value: T): Set<T> {
	const newSet = new Set(set);
	newSet.delete(value);
	return newSet;
}

// Remove multiple values in an an array from a set
export function removeValuesFromSet<T>(set: Set<T>, values: T[]): Set<T> {
	const newSet = new Set(set);
	values.forEach((value) => newSet.delete(value));
	return newSet;
}

// Gets the newly added values to a set
export function getAddedValuesForSet<T>(
	initialSet: Set<T>,
	valueAddedSet: Set<T>
): Array<T> {
	return Array.from(valueAddedSet).filter((id) => !initialSet.has(id));
}

// Gets the newly removed values from a set
export function getRemovedValuesForSet<T>(
	initialSet: Set<T>,
	valueAddedSet: Set<T>
): Array<T> {
	return Array.from(initialSet).filter((id) => !valueAddedSet.has(id));
}
