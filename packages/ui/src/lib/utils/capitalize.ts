export function capitalizeWord(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalize(str: string) {
	return str.replaceAll('-', ' ').split(' ').map(capitalizeWord).join(' ');
}
