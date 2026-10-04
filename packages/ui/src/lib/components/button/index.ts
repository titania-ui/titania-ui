import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Root } from './components/button-root.svelte';
import { theme } from './theme.js';

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

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, { Root, theme });
export default EXPORT;
