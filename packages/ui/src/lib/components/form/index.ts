import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the caller's schema shape is theirs to know
	own: { form: SuperForm<any> };
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

// FieldGroup
export type FieldGroupCfg = Define<{ tag: 'div' }>;
export type FieldGroupProps<TAs extends As | undefined = undefined> = Props<TAs, FieldGroupCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Fieldset: typeof Fieldset;
	Legend: typeof Legend;
	FieldGroup: typeof FieldGroup;
	theme: typeof theme;
	formCtx: typeof formCtx;
	fieldsetCtx: typeof fieldsetCtx;
} = Object.assign(Root, {
	Root,
	Fieldset,
	Legend,
	FieldGroup,
	theme,
	formCtx,
	fieldsetCtx
});
export default EXPORT;
