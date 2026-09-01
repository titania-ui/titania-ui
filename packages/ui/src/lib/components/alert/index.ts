import type { CloseButton, Icon } from '#lib';
import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { alertCtx } from './alert-context.js';
import { default as Description } from './components/alert-description.svelte';
import { default as Dismiss } from './components/alert-dismiss.svelte';
import { default as Indicator } from './components/alert-indicator.svelte';
import { default as Root } from './components/alert-root.svelte';
import { default as Title } from './components/alert-title.svelte';
import { theme } from './theme.js';

export { theme };

export { alertCtx };

// Root
export type RootCfg = Define<{
	tag: 'div';
	own: { dismissed?: boolean; ondismiss?: () => void };
	theme: ThemeOf<typeof theme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

// Title
export type TitleCfg = Define<{ tag: 'h3'; child: true }>;
export type TitleProps<TAs extends As | undefined = undefined> = Props<TAs, TitleCfg>;

// Description
export type DescriptionCfg = Define<{ tag: 'p'; child: true }>;
export type DescriptionProps<TAs extends As | undefined = undefined> = Props<TAs, DescriptionCfg>;

// Indicator
export type IndicatorCfg = Define<{ tag: typeof Icon; child: true }>;
export type IndicatorProps<TAs extends As | undefined = undefined> = Props<TAs, IndicatorCfg>;

// Dismiss
export type DismissCfg = Define<{ tag: typeof CloseButton; child: true }>;
export type DismissProps<TAs extends As | undefined = undefined> = Props<TAs, DismissCfg>;

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
