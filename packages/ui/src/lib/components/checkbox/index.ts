import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { checkboxCtx } from './checkbox-context.js';
import { default as Content } from './components/checkbox-content.svelte';
import { default as Control } from './components/checkbox-control.svelte';
import { default as Indicator } from './components/checkbox-indicator.svelte';
import { default as Root } from './components/checkbox-root.svelte';
import { theme } from './theme.js';

export { theme };

export { checkboxCtx };

type State = { checked: boolean; indeterminate: boolean };

// Root
export type RootCfg = Define<{
	tag: 'input';
	own: { checked?: boolean; indeterminate?: boolean; invalid?: boolean; disabled?: boolean };
	theme: ThemeOf<typeof theme>;
	state: State;
}>;
export type RootProps = Props<'input', RootCfg>;

// Control
export type ControlCfg = Define<{ tag: 'span'; child: true; state: State }>;
export type ControlProps<TAs extends As | undefined = undefined> = Props<TAs, ControlCfg>;

// Indicator
export type IndicatorCfg = Define<{ tag: 'span'; child: true; state: State }>;
export type IndicatorProps<TAs extends As | undefined = undefined> = Props<TAs, IndicatorCfg>;

// Content
export type ContentCfg = Define<{ tag: 'div'; child: true; state: State }>;
export type ContentProps<TAs extends As | undefined = undefined> = Props<TAs, ContentCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Control: typeof Control;
	Indicator: typeof Indicator;
	Content: typeof Content;
	theme: typeof theme;
	checkboxCtx: typeof checkboxCtx;
} = Object.assign(Root, {
	Root,
	Control,
	Indicator,
	Content,
	theme,
	checkboxCtx
});
export default EXPORT;
