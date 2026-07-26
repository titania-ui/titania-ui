import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	base: 'tabutton',
	variants: {
		variant: {
			default: 'tabutton--variant-default',
			primary: 'tabutton--variant-primary',
			secondary: 'tabutton--variant-secondary',
			tertiary: 'tabutton--variant-tertiary',
			danger: 'tabutton--variant-danger',
			ghost: 'tabutton--variant-ghost'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
