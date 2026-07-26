type AnyTheme = { variantKeys: string[] };

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
