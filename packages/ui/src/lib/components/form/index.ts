import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import type { SuperForm } from 'sveltekit-superforms';

// Theme
import { theme } from './theme.ts';
export { theme };

// State
import { formCtx, fieldsetCtx } from './form-context.ts';
export { formCtx, fieldsetCtx };

// Root
export type RootCfg = Define<{
	tag: 'form';
	own: { form: SuperForm<any> };
	theme: ThemeOf<typeof theme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './components/form-root.svelte';

// Fieldset
export type FieldsetCfg = Define<{ tag: 'fieldset' }>;
export type FieldsetProps<TAs extends As | undefined = undefined> = Props<TAs, FieldsetCfg>;
import { default as Fieldset } from './components/form-fieldset.svelte';

// Legend
export type LegendCfg = Define<{ tag: 'legend' }>;
export type LegendProps<TAs extends As | undefined = undefined> = Props<TAs, LegendCfg>;
import { default as Legend } from './components/form-legend.svelte';

// FieldGroup
export type FieldGroupCfg = Define<{ tag: 'div' }>;
export type FieldGroupProps<TAs extends As | undefined = undefined> = Props<TAs, FieldGroupCfg>;
import { default as FieldGroup } from './components/form-fieldgroup.svelte';

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
