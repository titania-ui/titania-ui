import type { FixedTagComponentProps, SwitchableTagComponentProps } from '../../types.ts';
import type { SuperForm } from 'sveltekit-superforms';

// Theme
import { rootTheme, fieldTheme, type RootThemeVariants, type FieldThemeVariants } from './theme.ts';
export { rootTheme, fieldTheme, type RootThemeVariants, type FieldThemeVariants };

// State
import { formCtx, fieldCtx } from './form-context.ts';
export { formCtx, fieldCtx };

// Root
export type RootPropsRaw<T extends Record<string, unknown>, M = any> = {
	form: SuperForm<T, M>;
};
export type RootProps<T extends Record<string, unknown>, M = any> = SwitchableTagComponentProps<
	'form',
	RootPropsRaw<T, M>,
	RootThemeVariants
>;
import { default as Root } from './components/form-root.svelte';

// Field
export type FieldPropsRaw = { name: string };
export type FieldProps = SwitchableTagComponentProps<'div', FieldPropsRaw, FieldThemeVariants>;
import { default as Field } from './components/form-field.svelte';

// Label
export type LabelPropsRaw = {};
export type LabelProps = SwitchableTagComponentProps<'label', LabelPropsRaw>;
import { default as Label } from './components/form-label.svelte';

// Input
export type InputType = 'text' | 'email' | 'password' | 'number' | 'date';
export type InputPropsRaw = { type: InputType };
export type InputProps = FixedTagComponentProps<'input', InputPropsRaw>;
import { default as Input } from './components/form-input.svelte';

// Error
export type ErrorPropsRaw = {};
export type ErrorProps = Omit<SwitchableTagComponentProps<'p', ErrorPropsRaw>, 'children'>;
import { default as Error } from './components/form-error.svelte';

// Desciption
export type DescriptionPropsRaw = {};
export type DescriptionProps = SwitchableTagComponentProps<'p', DescriptionPropsRaw>;
import { default as Description } from './components/form-description.svelte';

const EXPORT = Object.assign(Root, {
	Root,
	Field,
	Label,
	Input,
	Error,
	Description,
	rootTheme,
	fieldTheme,
	formCtx,
	fieldCtx
});
export default EXPORT;
