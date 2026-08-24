import type { As, Define, Props, ThemeOf } from '../../types/props.ts';
import type { CloseButton } from '../../index.ts';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'div';
	own: { dismissed?: boolean; ondismiss?: () => void };
	theme: ThemeOf<typeof theme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './components/chip-root.svelte';

// Dismiss
export type DismissCfg = Define<{ tag: typeof CloseButton; child: true }>;
export type DismissProps<TAs extends As | undefined = undefined> = Props<TAs, DismissCfg>;
import { default as Dismiss } from './components/chip-dismiss.svelte';

const EXPORT = Object.assign(Root, { Root, Dismiss, theme });
export default EXPORT;
