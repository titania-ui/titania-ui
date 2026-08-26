import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	base: 'talabel',
	variants: {
		invalid: {
			true: 'talabel--invalid'
		},
		required: {
			true: 'talabel--required'
		}
	},
	defaultVariants: {
		invalid: false,
		required: false
	}
});
