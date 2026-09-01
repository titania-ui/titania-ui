import { capitalize, capitalizeWord } from './capitalize';
import { describe, expect, it } from 'vitest';

describe('capitalizeWord', () => {
	it('capitalizes the first letter of a lowercase word', () => {
		expect(capitalizeWord('hello')).toBe('Hello');
	});

	it('leaves an already capitalized word unchanged', () => {
		expect(capitalizeWord('Hello')).toBe('Hello');
	});

	it('capitalizes a single character', () => {
		expect(capitalizeWord('a')).toBe('A');
	});

	it('returns an empty string when given an empty string', () => {
		expect(capitalizeWord('')).toBe('');
	});

	it('does not alter characters after the first', () => {
		expect(capitalizeWord('hELLO')).toBe('HELLO');
	});
});

describe('capitalize', () => {
	it('capitalizes a single lowercase word', () => {
		expect(capitalize('hello')).toBe('Hello');
	});

	it('capitalizes each word in a space-separated string', () => {
		expect(capitalize('hello world')).toBe('Hello World');
	});

	it('replaces hyphens with spaces and capitalizes each segment', () => {
		expect(capitalize('hello-world')).toBe('Hello World');
	});
});
