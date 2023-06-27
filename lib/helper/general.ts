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

export function addValueToSet<T extends { id: number }>(
	set: Set<T>,
	value: T
): Set<T> {
	const newSet = new Set(set);
	if (![...newSet].some((item) => item.id === value.id)) {
		newSet.add(value);
	}
	return newSet;
}

export function addValuesToSet<T extends { id: number }>(
	set: Set<T>,
	values: T[]
): Set<T> {
	const newSet = new Set(set);
	values.forEach((value) => {
		if (![...newSet].some((item) => item.id === value.id)) {
			newSet.add(value);
		}
	});
	return newSet;
}

export function removeValueFromSet<T extends { id: number }>(
	set: Set<T>,
	value: T
): Set<T> {
	return new Set([...set].filter((item) => item.id !== value.id));
}

export function removeValuesFromSet<T extends { id: number }>(
	set: Set<T>,
	values: T[]
): Set<T> {
	const idsToRemove = new Set(values.map((value) => value.id));
	return new Set([...set].filter((item) => !idsToRemove.has(item.id)));
}

export function getAddedValuesForSet<T extends { id: number }>(
	initialSet: Set<T>,
	valueAddedSet: Set<T>
): T[] {
	const initialIds = new Set([...initialSet].map((item) => item.id));
	return [...valueAddedSet].filter((item) => !initialIds.has(item.id));
}

export function getRemovedValuesForSet<T extends { id: number }>(
	initialSet: Set<T>,
	valueAddedSet: Set<T>
): T[] {
	const addedIds = new Set([...valueAddedSet].map((item) => item.id));
	return [...initialSet].filter((item) => !addedIds.has(item.id));
}

export function setContainsItem<T extends { id: number }>(
	set: Set<T>,
	value: T
): boolean {
	const itemIds = new Set([...set].map((item) => item.id));
	console.log(Array.from(itemIds));
	return itemIds.has(value.id);
}

// Function to group data by some key
export function groupBy<T>(
	list: T[],
	keyGetter: (input: T) => any
): { [key: string]: T[] } {
	return list.reduce((acc, item) => {
		const key = keyGetter(item);
		const collection = acc[key];
		if (!collection) {
			acc[key] = [item];
		} else {
			collection.push(item);
		}
		return acc;
	}, {} as { [key: string]: T[] });
}
