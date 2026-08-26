import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'taselect',
		wrapper: 'taselect__wrapper',
		icon: 'taselect__icon',
		icon__wrapper: 'taselect__icon__wrapper'
	},
	variants: {
		invalid: {
			true: {
				root: 'taselect--invalid',
				wrapper: 'taselect__wrapper--invalid'
			}
		}
	},
	defaultVariants: {
		invalid: false
	}
});
