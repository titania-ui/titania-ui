import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';

import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'span';
	theme: ThemeOf<typeof theme>;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Omit<
	Props<TAs, RootCfg>,
	'children'
>;
import { default as Root } from './components/spinner-root.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
