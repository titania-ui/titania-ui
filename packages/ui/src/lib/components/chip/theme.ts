import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	base: 'tachip',
	variants: {
		color: {
			default: 'tachip--color-default',
			accent: 'tachip--color-accent',
			success: 'tachip--color-success',
			warning: 'tachip--color-warning',
			danger: 'tachip--color-danger'
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
