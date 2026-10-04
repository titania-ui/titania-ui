import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Root } from './components/spinner-root.svelte';
import { theme } from './theme.js';

export { theme };

// Root
export type RootCfg = Define<{
	tag: 'span';
	theme: ThemeOf<typeof theme>;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg> & {
	children?: never;
};

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
