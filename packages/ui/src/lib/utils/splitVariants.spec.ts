import { splitVariants } from './splitVariants';
import { describe, expect, it } from 'vitest';

const theme = { variantKeys: ['size', 'variant'] as const };

describe('splitVariants', () => {
	it('separates variant props from the rest', () => {
		const split = splitVariants(theme, { size: 'sm', id: 'a', variant: 'primary' });
		expect(split.variants).toEqual({ size: 'sm', variant: 'primary' });
		expect(split.attrs).toEqual({ id: 'a' });
	});

	it('keeps listed variant props in attrs too', () => {
		const split = splitVariants(theme, { size: 'sm' }, ['size']);
		expect(split.attrs).toEqual({ size: 'sm' });
	});

	it('forwards symbol-keyed props (attachments) to attrs', () => {
		const key = Symbol('attachment');
		const attach = () => {};
		const split = splitVariants(theme, { size: 'sm', [key]: attach });
		expect((split.attrs as Record<symbol, unknown>)[key]).toBe(attach);
		expect(Object.getOwnPropertySymbols(split.variants)).toHaveLength(0);
	});
});
