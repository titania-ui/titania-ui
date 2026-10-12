import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Content } from './components/switch-content.svelte';
import { default as Control } from './components/switch-control.svelte';
import { default as Icon } from './components/switch-icon.svelte';
import { default as Root } from './components/switch-root.svelte';
import { default as Thumb } from './components/switch-thumb.svelte';
import { switchCtx } from './switch-context.js';
import { theme } from './theme.js';

export { theme };

export { switchCtx };

type State = { checked: boolean };

// Root
export type RootCfg = Define<{
	tag: 'input';
	own: { checked?: boolean; invalid?: boolean; disabled?: boolean };
	theme: ThemeOf<typeof theme>;
	state: State;
}>;
export type RootProps = Props<'input', RootCfg>;

// Control
export type ControlCfg = Define<{ tag: 'span'; child: true; state: State }>;
export type ControlProps<TAs extends As | undefined = undefined> = Props<TAs, ControlCfg>;

// Thumb
export type ThumbCfg = Define<{ tag: 'span'; child: true; state: State }>;
export type ThumbProps<TAs extends As | undefined = undefined> = Props<TAs, ThumbCfg>;

// Icon
export type IconCfg = Define<{ tag: 'span'; child: true; state: State }>;
export type IconProps<TAs extends As | undefined = undefined> = Props<TAs, IconCfg>;

// Content
export type ContentCfg = Define<{ tag: 'div'; child: true; state: State }>;
export type ContentProps<TAs extends As | undefined = undefined> = Props<TAs, ContentCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Control: typeof Control;
	Thumb: typeof Thumb;
	Icon: typeof Icon;
	Content: typeof Content;
	theme: typeof theme;
	switchCtx: typeof switchCtx;
} = Object.assign(Root, {
	Root,
	Control,
	Thumb,
	Icon,
	Content,
	theme,
	switchCtx
});
export default EXPORT;
