import type { As, Define, Props, ThemeOf } from '../../types/props.ts';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'button';
	theme: ThemeOf<typeof theme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './close-button-root.svelte';

const EXPORT = Object.assign(Root, { Root, theme });
export default EXPORT;
