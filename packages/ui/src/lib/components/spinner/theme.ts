import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'taspinner'
	},
	variants: {
		status: {
			default: {
				root: 'taspinner--status-default'
			},
			info: {
				root: 'taspinner--status-info'
			},
			success: {
				root: 'taspinner--status-success'
			},
			warning: {
				root: 'taspinner--status-warning'
			},
			danger: {
				root: 'taspinner--status-danger'
			}
		}
	},
	defaultVariants: {
		status: 'default'
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
