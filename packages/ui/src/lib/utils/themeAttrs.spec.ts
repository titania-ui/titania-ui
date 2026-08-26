import { describe, it, expect } from 'vitest';
import { themeAttrs, splitVariants } from './themeAttrs';

function makeTheme(variantKeys: readonly string[]) {
	return { variantKeys };
}

describe('splitVariants', () => {
	it('splits variant keys into `variants` and the rest into `attrs`', () => {
		const theme = makeTheme(['color', 'size']);
		const result = splitVariants(theme, { color: 'red', size: 'lg', id: 'box-1' });
		expect(result.variants).toEqual({ color: 'red', size: 'lg' });
		expect(result.attrs).toEqual({ id: 'box-1' });
	});

	it('produces empty variants when no keys match', () => {
		const theme = makeTheme(['color']);
		const result = splitVariants(theme, { id: 'x', className: 'y' });
		expect(result.variants).toEqual({});
		expect(result.attrs).toEqual({ id: 'x', className: 'y' });
	});

	it('produces empty attrs when all keys are variants and none are kept', () => {
		const theme = makeTheme(['color', 'size']);
		const result = splitVariants(theme, { color: 'red', size: 'lg' });
		expect(result.variants).toEqual({ color: 'red', size: 'lg' });
		expect(result.attrs).toEqual({});
	});

	it('includes a kept variant key in both `variants` and `attrs`', () => {
		const theme = makeTheme(['color', 'size']);
		const result = splitVariants(theme, { color: 'red', size: 'lg', id: 'x' }, ['color']);
		expect(result.variants).toEqual({ color: 'red', size: 'lg' });
		expect(result.attrs).toEqual({ color: 'red', id: 'x' });
	});

	it('supports keeping multiple variant keys', () => {
		const theme = makeTheme(['color', 'size']);
		const result = splitVariants(theme, { color: 'red', size: 'lg', id: 'x' }, ['color', 'size']);
		expect(result.variants).toEqual({ color: 'red', size: 'lg' });
		expect(result.attrs).toEqual({ color: 'red', size: 'lg', id: 'x' });
	});

	it('handles a theme with no variant keys (everything goes to attrs)', () => {
		const theme = makeTheme([]);
		const result = splitVariants(theme, { id: 'x', color: 'red' });
		expect(result.variants).toEqual({});
		expect(result.attrs).toEqual({ id: 'x', color: 'red' });
	});

	it('handles an empty rest object', () => {
		const theme = makeTheme(['color']);
		const result = splitVariants(theme, {});
		expect(result.variants).toEqual({});
		expect(result.attrs).toEqual({});
	});

	it('defaults keep to an empty array when omitted', () => {
		const theme = makeTheme(['color']);
		const result = splitVariants(theme, { color: 'red', id: 'x' });
		expect(result.variants).toEqual({ color: 'red' });
		expect(result.attrs).toEqual({ id: 'x' });
	});

	it('a keep entry that is not present in rest has no effect', () => {
		const theme = makeTheme(['color']);
		// @ts-ignore Error is expected
		const result = splitVariants(theme, { id: 'x' }, ['color']);
		expect(result.variants).toEqual({});
		expect(result.attrs).toEqual({ id: 'x' });
	});

	it('preserves falsy and nullish values correctly', () => {
		const theme = makeTheme(['color', 'disabled']);
		const result = splitVariants(theme, {
			color: '',
			disabled: false,
			count: 0,
			label: null
		});
		expect(result.variants).toEqual({ color: '', disabled: false });
		expect(result.attrs).toEqual({ count: 0, label: null });
	});
});
