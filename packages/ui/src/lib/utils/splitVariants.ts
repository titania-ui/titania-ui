import type { Pretty } from '#lib/types/utils.ts';

type AnyTheme = { variantKeys: readonly string[] };

type VariantKey<Th extends AnyTheme> = string extends Th['variantKeys'][number]
	? never
	: Th['variantKeys'][number];

export type SplitVariants<Th extends AnyTheme, T, K extends readonly string[] = []> = {
	variants: Pick<T, Extract<keyof T, VariantKey<Th>>>;
	attrs: Omit<T, Exclude<VariantKey<Th>, K[number]>>;
};

export function splitVariants<
	Th extends AnyTheme,
	T extends Record<string, unknown>,
	const K extends readonly Extract<keyof T, string>[] = []
>(theme: Th, rest: T, keep?: K): Pretty<SplitVariants<Th, T, K>> {
	const isVariant = new Set(theme.variantKeys);
	const isKept = new Set<string>(keep ?? []);

	const variants: Record<string, unknown> = {};
	const attrs: Record<string, unknown> = {};

	for (const k of Object.keys(rest)) {
		if (isVariant.has(k)) variants[k] = rest[k];
		if (!isVariant.has(k) || isKept.has(k)) attrs[k] = rest[k];
	}

	return { variants, attrs } as SplitVariants<Th, T, K>;
}
