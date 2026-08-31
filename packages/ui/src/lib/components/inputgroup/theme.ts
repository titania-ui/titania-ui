import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tainputgroup',
		prefix: 'tainputgroup__prefix',
		suffix: 'tainputgroup__suffix'
	},
	variants: {
		invalid: {
			true: {
				root: 'tainputgroup--invalid',
				prefix: 'tainputgroup__prefix--invalid',
				suffix: 'tainputgroup__suffix--invalid'
			}
		},
		disabled: {
			true: {
				root: 'tainputgroup--disabled',
				prefix: 'tainputgroup__prefix--disabled',
				suffix: 'tainputgroup__suffix--disabled'
			}
		}
	},
	defaultVariants: {
		invalid: false,
		disabled: false
	}
});
