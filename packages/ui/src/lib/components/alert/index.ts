import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import type { CloseButton, Icon } from '#lib';

// Theme
import { theme } from './theme.ts';
export { theme };

// State
import { alertCtx } from './alert-context.ts';
export { alertCtx };

// Root
export type RootCfg = Define<{
	tag: 'div';
	own: { dismissed?: boolean; ondismiss?: () => void };
	theme: ThemeOf<typeof theme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './components/alert-root.svelte';

// Title
export type TitleCfg = Define<{ tag: 'h3'; child: true }>;
export type TitleProps<TAs extends As | undefined = undefined> = Props<TAs, TitleCfg>;
import { default as Title } from './components/alert-title.svelte';

// Description
export type DescriptionCfg = Define<{ tag: 'p'; child: true }>;
export type DescriptionProps<TAs extends As | undefined = undefined> = Props<TAs, DescriptionCfg>;
import { default as Description } from './components/alert-description.svelte';

// Indicator
export type IndicatorCfg = Define<{ tag: typeof Icon; child: true }>;
export type IndicatorProps<TAs extends As | undefined = undefined> = Props<TAs, IndicatorCfg>;
import { default as Indicator } from './components/alert-indicator.svelte';

// Dismiss
export type DismissCfg = Define<{ tag: typeof CloseButton; child: true }>;
export type DismissProps<TAs extends As | undefined = undefined> = Props<TAs, DismissCfg>;
import { default as Dismiss } from './components/alert-dismiss.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	Title: typeof Title;
	Description: typeof Description;
	Indicator: typeof Indicator;
	Dismiss: typeof Dismiss;
	theme: typeof theme;
	alertCtx: typeof alertCtx;
} = Object.assign(Root, {
	Root,
	Title,
	Description,
	Indicator,
	Dismiss,
	theme,
	alertCtx
});
export default EXPORT;
