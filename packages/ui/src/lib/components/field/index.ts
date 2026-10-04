import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Control } from './components/field-control.svelte';
import { default as Description } from './components/field-description.svelte';
import { default as Error } from './components/field-error.svelte';
import { default as Root } from './components/field-root.svelte';
import { fieldCtx } from './field-context.js';
import { theme } from './theme.js';
import type { Snippet } from 'svelte';

export { theme };

export { fieldCtx };

// Root
export type RootCfg = Define<{
	tag: 'div';
	own: { auto?: boolean; disabled?: boolean; required?: boolean; errors?: string[]; name?: string };
	theme: ThemeOf<typeof theme>;
	state: { errors: string[]; required: boolean; disabled: boolean };
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

// Description
export type DescriptionCfg = Define<{ tag: 'p'; child: true }>;
export type DescriptionProps<TAs extends As | undefined = undefined> = Props<TAs, DescriptionCfg>;

// Error
export type ErrorCfg = Define<{ tag: 'p'; child: true; state: { errors: string[] } }>;
export type ErrorProps<TAs extends As | undefined = undefined> = Props<TAs, ErrorCfg> & {
	children?: never;
};

// Control
export type ControlProps = { children: Snippet<[{ props: Record<string, unknown> }]>; id?: string };

const EXPORT: typeof Root & {
	Root: typeof Root;
	Description: typeof Description;
	Error: typeof Error;
	Control: typeof Control;
	theme: typeof theme;
	fieldCtx: typeof fieldCtx;
} = Object.assign(Root, {
	Root,
	Description,
	Error,
	Control,
	theme,
	fieldCtx
});
export default EXPORT;
