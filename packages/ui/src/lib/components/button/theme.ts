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
		},
		size: {
			sm: 'tabutton--size-sm',
			md: 'tabutton--size-md',
			lg: 'tabutton--size-lg',
			xl: 'tabutton--size-xl'
		},
		disabled: {
			true: 'tabutton--disabled'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'md'
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
