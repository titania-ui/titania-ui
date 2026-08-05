import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	base: 'tabutton',
	variants: {
		variant: {
			default: 'tabutton--variant-default',
			primary: 'tabutton--variant-primary',
			secondary: 'tabutton--variant-secondary',
			tertiary: 'tabutton--variant-tertiary',
			outline: 'tabutton--variant-outline',
			ghost: 'tabutton--variant-ghost',
			danger: 'tabutton--variant-danger'
		},
		size: {
			xs: 'tabutton--size-xs',
			sm: 'tabutton--size-sm',
			md: 'tabutton--size-md',
			lg: 'tabutton--size-lg'
		},
		disabled: {
			true: 'tabutton--disabled'
		},
		color: {
			dark: 'tabutton--color-dark',
			zinc: 'tabutton--color-zinc',
			white: 'tabutton--color-white',
			red: 'tabutton--color-red',
			orange: 'tabutton--color-orange',
			amber: 'tabutton--color-amber',
			yellow: 'tabutton--color-yellow',
			lime: 'tabutton--color-lime',
			green: 'tabutton--color-green',
			emerald: 'tabutton--color-emerald',
			teal: 'tabutton--color-teal',
			cyan: 'tabutton--color-cyan',
			sky: 'tabutton--color-sky',
			blue: 'tabutton--color-blue',
			indigo: 'tabutton--color-indigo',
			violet: 'tabutton--color-violet',
			purple: 'tabutton--color-purple',
			fuchsia: 'tabutton--color-fuchsia',
			pink: 'tabutton--color-pink',
			rose: 'tabutton--color-rose'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'md'
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
