import type { As, Define, Props, StateOf, ThemeOf } from '../../types/props.ts';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'button';
	when: { href: 'a' };
	own: { href?: string; pending?: boolean; disabled?: boolean };
	theme: ThemeOf<typeof theme>;
	state: { pending: boolean; disabled: boolean };
	child: true;
}>;
export type RootProps<
	TAs extends As | undefined = undefined,
	THref extends string | undefined = undefined
> = Props<TAs, RootCfg, THref>;
export type RootState = StateOf<RootCfg>;
import { default as Root } from './components/button-root.svelte';

const EXPORT = Object.assign(Root, { Root, theme });
export default EXPORT;
