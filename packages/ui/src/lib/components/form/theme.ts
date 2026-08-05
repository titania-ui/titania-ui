import { tv, type VariantProps } from 'tailwind-variants/lite';

export const rootTheme = tv({
	slots: {
		root: 'taform',
		fieldset: 'taform__fieldset',
		legend: 'taform__legend',
		fieldgroup: 'taform__fieldgroup'
	},
	variants: {}
});

export type RootThemeVariants = VariantProps<typeof rootTheme>;

export const fieldTheme = tv({
	slots: {
		root: 'tafield',
		error: 'tafield__error',
		description: 'tafield__description',
		label: 'tafield__label'
	},
	variants: {
		invalid: {
			true: {
				root: 'tafield--invalid',
				error: 'tafield__error--invalid',
				description: 'tafield__description--invalid',
				label: 'tafield__label--invalid'
			}
		}
	},
	defaultVariants: {
		invalid: false
	}
});

export type FieldThemeVariants = VariantProps<typeof fieldTheme>;
