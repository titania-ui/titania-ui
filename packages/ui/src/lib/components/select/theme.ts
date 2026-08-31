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
		},
		disabled: {
			true: {
				root: 'taselect--disabled',
				wrapper: 'taselect__wrapper--disabled'
			}
		},
		multiple: {
			true: {
				root: 'taselect--multiple'
			}
		}
	},
	defaultVariants: {
		invalid: false,
		disabled: false,
		multiple: false
	}
});
