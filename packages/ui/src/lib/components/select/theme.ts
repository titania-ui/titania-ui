import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'taselect',
		wrapper: 'taselect__wrapper',
		icon__wrapper: 'taselect__icon__wrapper',
		icon: 'taselect__icon'
	},
	variants: {
		invalid: {
			true: {
				root: 'taselect--invalid',
				wrapper: 'taselect__wrapper--invalid',
				icon: 'taselect__icon--invalid'
			}
		},
		disabled: {
			true: {
				root: 'taselect--disabled',
				wrapper: 'taselect__wrapper--disabled',
				icon: 'taselect__icon--disabled'
			}
		},
		multiple: {
			true: {
				root: 'taselect--multiple',
				wrapper: 'taselect__wrapper--multiple',
				icon: 'taselect__icon--multiple'
			}
		}
	},
	defaultVariants: {
		invalid: false,
		disabled: false
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
