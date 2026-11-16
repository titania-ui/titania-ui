import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as ErrorSummary } from './components/form-errorsummary.svelte';
import { default as FieldGroup } from './components/form-fieldgroup.svelte';
import { default as Fieldset } from './components/form-fieldset.svelte';
import { default as Legend } from './components/form-legend.svelte';
import { default as Root } from './components/form-root.svelte';
import { fieldsetCtx, formCtx } from './form-context.js';
import { theme } from './theme.js';
import type { SuperForm } from 'sveltekit-superforms';

export { theme };

export { formCtx, fieldsetCtx };

// Root
export type RootCfg = Define<{
	tag: 'form';
	own: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the caller's schema shape is theirs to know
		form: SuperForm<any>;
		/**
		 * Where focus goes after a submit with errors.
		 * - `auto` (default): the `Form.ErrorSummary` when there is one, else the first invalid control.
		 * - `summary`: the `Form.ErrorSummary` only.
		 * - `field`: the first invalid control.
		 * - `none`: leave focus alone and announce the error count through the global `<Announcer />`.
		 */
		focus?: 'auto' | 'summary' | 'field' | 'none';
		/** Builds the announcement for a failed submit with `focus="none"`. Defaults to an English sentence, pass your translation. */
		announceErrors?: (count: number) => string;
	};
	theme: ThemeOf<typeof theme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

// Fieldset
export type FieldsetCfg = Define<{ tag: 'fieldset'; child: true }>;
export type FieldsetProps<TAs extends As | undefined = undefined> = Props<TAs, FieldsetCfg>;

// Legend
export type LegendCfg = Define<{ tag: 'legend'; child: true }>;
export type LegendProps<TAs extends As | undefined = undefined> = Props<TAs, LegendCfg>;

// ErrorSummary
export type ErrorSummaryCfg = Define<{
	tag: 'div';
	own: {
		/** Builds the heading, e.g. "2 errors". */
		title?: (count: number) => string;
	};
	child: true;
}>;
export type ErrorSummaryProps<TAs extends As | undefined = undefined> = Props<TAs, ErrorSummaryCfg>;

// FieldGroup
export type FieldGroupCfg = Define<{ tag: 'div' }>;
export type FieldGroupProps<TAs extends As | undefined = undefined> = Props<TAs, FieldGroupCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Fieldset: typeof Fieldset;
	ErrorSummary: typeof ErrorSummary;
	Legend: typeof Legend;
	FieldGroup: typeof FieldGroup;
	theme: typeof theme;
	formCtx: typeof formCtx;
	fieldsetCtx: typeof fieldsetCtx;
} = Object.assign(Root, {
	Root,
	Fieldset,
	ErrorSummary,
	Legend,
	FieldGroup,
	theme,
	formCtx,
	fieldsetCtx
});
export default EXPORT;
