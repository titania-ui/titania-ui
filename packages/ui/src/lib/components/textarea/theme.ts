import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tatextarea',
		wrapper: 'tatextarea__wrapper'
	},
	variants: {
		invalid: {
			true: {
				root: 'tatextarea--invalid',
				wrapper: 'tatextarea__wrapper--invalid'
			}
		},
		disabled: {
			true: {
				root: 'tatextarea--disabled',
				wrapper: 'tatextarea__wrapper--disabled'
			}
		}
	},
	defaultVariants: {
		invalid: false,
		disabled: false
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
