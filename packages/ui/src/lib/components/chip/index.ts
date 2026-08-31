import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';
import type { CloseButton } from '#lib';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'span';
	own: { dismissed?: boolean; ondismiss?: () => void };
	theme: ThemeOf<typeof theme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './components/chip-root.svelte';

// Label
export type LabelCfg = Define<{ tag: 'span' }>;
export type LabelProps<TAs extends As | undefined = undefined> = Props<TAs, LabelCfg>;
import { default as Label } from './components/chip-label.svelte';

// Dismiss
export type DismissCfg = Define<{ tag: typeof CloseButton; child: true }>;
export type DismissProps<TAs extends As | undefined = undefined> = Props<TAs, DismissCfg>;
import { default as Dismiss } from './components/chip-dismiss.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	Label: typeof Label;
	Dismiss: typeof Dismiss;
	theme: typeof theme;
} = Object.assign(Root, { Root, Label, Dismiss, theme });
export default EXPORT;
