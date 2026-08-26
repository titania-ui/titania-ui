import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'button';
	when: { href: 'a' };
	own: { href?: string; pending?: boolean; disabled?: boolean };
	theme: ThemeOf<typeof theme>;
	state: {
		pending: boolean;
		disabled: boolean;
		hovered: boolean;
		pressed: boolean;
		focused: boolean;
	};
	child: true;
}>;
export type RootProps<
	TAs extends As | undefined = undefined,
	THref extends string | undefined = undefined
> = Props<TAs, RootCfg, THref>;
import { default as Root } from './components/button-root.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, { Root, theme });
export default EXPORT;
