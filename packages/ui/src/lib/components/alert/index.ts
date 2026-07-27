import type { SwitchableTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// State
import { alertCtx } from './alert-context.ts';
export { alertCtx };

// Root
export type RootPropsRaw = { dismissed?: boolean; onDismiss?: () => void };
export type RootProps = SwitchableTagComponentProps<'div', RootPropsRaw, ThemeVariants>;
import { default as Root } from './components/alert-root.svelte';

// Title
export type TitlePropsRaw = {};
export type TitleProps = SwitchableTagComponentProps<'h3', TitlePropsRaw>;
import { default as Title } from './components/alert-title.svelte';

// Description
export type DescriptionPropsRaw = {};
export type DescriptionProps = SwitchableTagComponentProps<'p', DescriptionPropsRaw>;
import { default as Description } from './components/alert-description.svelte';

// Indicator
export type IndicatorPropsRaw = {};
export type IndicatorProps = SwitchableTagComponentProps<'div', IndicatorPropsRaw>;
import { default as Indicator } from './components/alert-indicator.svelte';

// Dismiss
export type DismissPropsRaw = {};
export type DismissProps = SwitchableTagComponentProps<'button', DismissPropsRaw>;
import { default as Dismiss } from './components/alert-dismiss.svelte';

const EXPORT = Object.assign(Root, {
	Root,
	Title,
	Description,
	Indicator,
	Dismiss,
	theme,
	alertCtx
});
export default EXPORT;
