import type { Pretty } from '../types/props.ts';

const passthroughCache = new WeakMap<AnyTheme, Set<string>>();

function variantKeySet(theme: AnyTheme): Set<string> {
	let keys = passthroughCache.get(theme);
	if (!keys) {
		keys = new Set(theme.variantKeys);
		passthroughCache.set(theme, keys);
	}
	return keys;
}

export function themeAttrs<T extends Record<string, unknown>>(
	theme: AnyTheme,
	props: T,
	keep: readonly string[] = []
): Record<string, unknown> {
	const variants = variantKeySet(theme);
	const kept = keep.length ? new Set(keep) : null;

	const attrs: Record<string, unknown> = {};
	for (const key in props) {
		if (variants.has(key) && !(kept?.has(key) ?? false)) continue;
		attrs[key] = props[key];
	}
	return attrs;
}

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
