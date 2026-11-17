import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tabuttongroup'
	},
	variants: {
		orientation: {
			horizontal: {
				root: 'tabuttongroup--orientation-horizontal'
			},
			vertical: {
				root: 'tabuttongroup--orientation-vertical'
			}
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});
