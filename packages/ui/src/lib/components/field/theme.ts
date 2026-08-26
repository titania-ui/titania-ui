import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tafield',
		error: 'tafield__error',
		description: 'tafield__description'
	},
	variants: {
		invalid: {
			true: {
				root: 'tafield--invalid',
				error: 'tafield__error--invalid',
				description: 'tafield__description--invalid'
			}
		}
	},
	defaultVariants: {
		invalid: false
	}
});
