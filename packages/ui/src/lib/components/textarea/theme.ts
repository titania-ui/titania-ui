import { tv } from 'tailwind-variants/lite';

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
		}
	},
	defaultVariants: {
		invalid: false
	}
});
