import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	base: 'taspinner',
	variants: {
		color: {
			default: 'taspinner--color-default',
			accent: 'taspinner--color-accent',
			success: 'taspinner--color-success',
			warning: 'taspinner--color-warning',
			danger: 'taspinner--color-danger'
		}
	},
	defaultVariants: {
		color: 'default'
	}
});
