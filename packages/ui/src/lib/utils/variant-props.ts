/**
 * Splits a prop bag against a `tv()` theme's own variant keys.
 *
 * `tv()` exposes `variantKeys` at runtime (`Object.keys(variants)`), so nothing
 * here needs to know that this particular theme happens to have a `status`
 * variant. Add a variant to the theme and both halves of the split follow
 * automatically.
 */

type VariantAware<V> = { readonly variantKeys?: readonly (keyof V & string)[] };

/**
 * The variant subset of `props`, suitable for passing to `theme()` / `themeAttrs()`.
 *
 * Iterates `theme.variantKeys` rather than `Object.keys(props)`, so the read set
 * is limited to variant props. Inside a `$derived` that means the result only
 * invalidates when a *variant* changes — not when an unrelated attribute like
 * `style` or `onclick` does.
 */
export function pickVariantProps<V extends Record<string, unknown>>(
	theme: VariantAware<V>,
	props: Record<string, unknown>
): V {
	const out: Record<string, unknown> = {};
	for (const key of theme.variantKeys ?? []) {
		if (key in props) out[key] = props[key];
	}
	return out as V;
}

/**
 * Everything that is *not* a variant — i.e. the props that should reach the DOM.
 * Prevents `status="info"` (and any future variant) from being rendered as a
 * stray attribute on the element.
 */
export function omitVariantProps<P extends Record<string, unknown>>(
	theme: VariantAware<Record<string, unknown>>,
	props: P
): P {
	const variantKeys = new Set<string>(theme.variantKeys ?? []);
	const out: Record<string, unknown> = {};
	for (const key in props) {
		if (!variantKeys.has(key)) out[key] = props[key];
	}
	return out as P;
}
