import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import type { Snippet } from 'svelte';

// Theme
import { theme } from './theme.ts';
export { theme };

// State
import { fieldCtx } from './field-context.ts';
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
import { default as Root } from './components/field-root.svelte';

// Description
export type DescriptionCfg = Define<{ tag: 'p'; child: true }>;
export type DescriptionProps<TAs extends As | undefined = undefined> = Props<TAs, DescriptionCfg>;
import { default as Description } from './components/field-description.svelte';

// Error
export type ErrorCfg = Define<{ tag: 'p'; child: true; state: { errors: string[] } }>;
export type ErrorProps<TAs extends As | undefined = undefined> = Props<TAs, ErrorCfg> & {
	children?: never;
};
import { default as Error } from './components/field-error.svelte';

// Control
export type ControlProps = { children: Snippet<[{ props: Record<string, unknown> }]>; id?: string };
import { default as Control } from './components/field-control.svelte';

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
