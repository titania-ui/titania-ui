import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tainput',
		wrapper: 'tainput__wrapper'
	},
	variants: {
		invalid: {
			true: {
				root: 'tainput--invalid',
				wrapper: 'tainput__wrapper--invalid'
			}
		}
	},
	defaultVariants: {
		invalid: false
	}
});
