import { tv, type VariantProps } from 'tailwind-variants/lite';

export const rootTheme = tv({
	slots: {
		root: 'taform'
	},
	variants: {}
});

export type RootThemeVariants = VariantProps<typeof rootTheme>;

export const fieldTheme = tv({
	slots: {
		root: 'tafield',
		label: 'talabel',
		error: 'tafield__error',
		input: 'tainput',
		textarea: 'tatextarea',
		description: 'tafield__description'
	},
	variants: {
		invalid: {
			true: {
				root: 'tafield--invalid',
				error: 'tafield__error--invalid',
				input: 'tainput--invalid',
				label: 'talabel--invalid',
				textarea: 'tatextarea--invalid',
				description: 'tafield__description--invalid'
			}
		}
	},
	defaultVariants: {
		invalid: false
	}
});

export type FieldThemeVariants = VariantProps<typeof fieldTheme>;
