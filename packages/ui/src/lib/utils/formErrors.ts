export type FormErrorItem = { name: string; messages: string[] };

/** Flattens a superforms `errors` object into `{ name, messages }` entries (`name` is '' for form-level errors). */
export function collectFormErrors(
	errors: unknown,
	acc: FormErrorItem[] = [],
	path = ''
): FormErrorItem[] {
	if (!errors || typeof errors !== 'object') return acc;
	for (const [key, value] of Object.entries(errors as Record<string, unknown>)) {
		if (key === '_errors') {
			if (Array.isArray(value) && value.length)
				acc.push({ name: path, messages: value as string[] });
		} else if (Array.isArray(value)) {
			if (value.length && typeof value[0] === 'string')
				acc.push({ name: path ? `${path}.${key}` : key, messages: value as string[] });
		} else collectFormErrors(value, acc, path ? `${path}.${key}` : key);
	}
	return acc;
}
