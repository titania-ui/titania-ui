import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Root } from './components/close-button-root.svelte';
import { theme } from './theme.js';

export { theme };

// Root
export type RootCfg = Define<{
	tag: 'button';
	theme: ThemeOf<typeof theme>;
	state: { hovered: boolean; pressed: boolean; focused: boolean };
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, { Root, theme });
export default EXPORT;
