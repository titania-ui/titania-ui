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
		description: 'tafield__description'
	},
	variants: {}
});

export type FieldThemeVariants = VariantProps<typeof fieldTheme>;
