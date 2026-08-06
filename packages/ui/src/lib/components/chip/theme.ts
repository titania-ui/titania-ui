import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	base: 'tachip',
	variants: {
		color: {
			default: 'tachip--color-default',
			accent: 'tachip--color-accent',
			success: 'tachip--color-success',
			warning: 'tachip--color-warning',
			danger: 'tachip--color-danger',

			red: 'tachip--color-red',
			orange: 'tachip--color-orange',
			amber: 'tachip--color-amber',
			yellow: 'tachip--color-yellow',
			lime: 'tachip--color-lime',
			green: 'tachip--color-green',
			emerald: 'tachip--color-emerald',
			teal: 'tachip--color-teal',
			cyan: 'tachip--color-cyan',
			sky: 'tachip--color-sky',
			blue: 'tachip--color-blue',
			indigo: 'tachip--color-indigo',
			violet: 'tachip--color-violet',
			purple: 'tachip--color-purple',
			fuchsia: 'tachip--color-fuchsia',
			pink: 'tachip--color-pink',
			rose: 'tachip--color-rose',
			zinc: 'tachip--color-zinc'
		},
		size: {
			sm: 'tachip--size-sm',
			md: 'tachip--size-md',
			lg: 'tachip--size-lg'
		}
	},
	defaultVariants: {
		color: 'default',
		size: 'md',
		variant: 'primary'
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
