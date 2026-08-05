import type { SwitchableTagComponentProps } from '../../types.ts';
import type { SuperForm } from 'sveltekit-superforms';

// Theme
import { rootTheme, fieldTheme, type RootThemeVariants, type FieldThemeVariants } from './theme.ts';
export { rootTheme, fieldTheme, type RootThemeVariants, type FieldThemeVariants };

// State
import {
	formCtx,
	fieldCtx,
	fieldsetCtx,
	controlCtx,
	type FieldCtx,
	type FormCtx,
	type FieldsetCtx,
	type ControlCtx
} from './form-context.ts';
export {
	formCtx,
	fieldCtx,
	fieldsetCtx,
	controlCtx,
	type FieldCtx,
	type FormCtx,
	type FieldsetCtx,
	type ControlCtx
};

// Root
export type RootPropsRaw<T extends Record<string, unknown>, M = unknown> = {
	form: SuperForm<T, M>;
};
export type RootProps<T extends Record<string, unknown>, M = unknown> = SwitchableTagComponentProps<
	'form',
	RootPropsRaw<T, M>,
	RootThemeVariants
>;
import { default as Root } from './components/form-root.svelte';

// Fieldset
export type FieldsetPropsRaw = {};
export type FieldsetProps = SwitchableTagComponentProps<'fieldset', FieldsetPropsRaw>;
import { default as Fieldset } from './components/form-fieldset.svelte';

// Legend
export type LegendPropsRaw = {};
export type LegendProps = SwitchableTagComponentProps<'legend', LegendPropsRaw>;
import { default as Legend } from './components/form-legend.svelte';

// FieldGroup
export type FieldGroupPropsRaw = {};
export type FieldGroupProps = SwitchableTagComponentProps<'div', FieldGroupPropsRaw>;
import { default as FieldGroup } from './components/form-fieldgroup.svelte';

// Field
export type FieldPropsRaw = {
	auto?: boolean;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	errors?: string[];
};
export type FieldProps = SwitchableTagComponentProps<'div', FieldPropsRaw, FieldThemeVariants>;
import { default as Field } from './components/form-field.svelte';

// Control
export type ControlProps = { children: Snippet<[{ props: Record<string, unknown> }]>; id?: string };
import { default as Control } from './components/form-control.svelte';

// Label
export type LabelPropsRaw = {};
export type LabelProps = SwitchableTagComponentProps<'label', LabelPropsRaw>;
import { default as Label } from './components/form-label.svelte';

/*
// Input
export type InputType = 'text' | 'email' | 'password' | 'number' | 'date';
export type InputPropsRaw = { type: InputType };
export type InputProps = FixedTagComponentProps<'input', InputPropsRaw>;
import { default as Input } from './components/form-input.svelte';

// Textarea
export type TextareaPropsRaw = {};
export type TextareaProps = FixedTagComponentProps<'textarea', TextareaPropsRaw>;
import { default as Textarea } from './components/form-textarea.svelte';
*/

// Error
export type ErrorPropsRaw = {};
export type ErrorProps = Omit<SwitchableTagComponentProps<'p', ErrorPropsRaw>, 'children'>;
import { default as Error } from './components/form-error.svelte';

// Desciption
export type DescriptionPropsRaw = {};
export type DescriptionProps = SwitchableTagComponentProps<'p', DescriptionPropsRaw>;
import { default as Description } from './components/form-description.svelte';
import type { Snippet } from 'svelte';

const EXPORT = Object.assign(Root, {
	// Root
	Root,
	Fieldset,
	Legend,
	FieldGroup,

	// Field
	Field,
	Error,
	Description,
	Control,
	Label,

	// Themes
	rootTheme,
	fieldTheme,

	// Context
	formCtx,
	fieldCtx,
	fieldsetCtx,
	controlCtx
});
export default EXPORT;
