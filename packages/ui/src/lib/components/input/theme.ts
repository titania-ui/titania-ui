import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tainput',
		wrapper: 'tainput__wrapper'
	},
	variants: {
		invalid: {
			true: {
				root: 'tainput--invalid',
				wrapper: 'tainput__wrapper--invalid'
			}
		},
		disabled: {
			true: {
				root: 'tainput--disabled',
				wrapper: 'tainput__wrapper--disabled'
			}
		}
	},
	defaultVariants: {
		invalid: false,
		disabled: false
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
