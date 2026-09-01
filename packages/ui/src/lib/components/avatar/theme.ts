import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'taavatar',
		image: 'taavatar__image',
		fallback: 'taavatar__fallback'
	},
	variants: {
		size: {
			sm: {
				root: 'taavatar--size-sm'
			},
			md: {
				root: 'taavatar--size-md'
			},
			lg: {
				root: 'taavatar--size-lg'
			}
		},
		color: {
			default: {
				fallback: 'taavatar__fallback--color-default'
			},
			accent: {
				fallback: 'taavatar__fallback--color-accent'
			},
			success: {
				fallback: 'taavatar__fallback--color-success'
			},
			warning: {
				fallback: 'taavatar__fallback--color-warning'
			},
			danger: {
				fallback: 'taavatar__fallback--color-danger'
			}
		}
	},
	defaultVariants: {
		size: 'md',
		color: 'default'
	}
});
