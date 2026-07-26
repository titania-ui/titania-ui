import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'taalert',
		description: 'taalert__description',
		title: 'taalert__title',
		indicator: 'taalert__indicator',
		indicatorDefault: 'taalert__indicator__default'
	},
	variants: {
		status: {
			default: {
				root: 'taalert--status-default',
				description: 'taalert__description--status-default',
				title: 'taalert__title--status-default',
				indicator: 'taalert__indicator--status-default'
			},
			info: {
				root: 'taalert--status-info',
				description: 'taalert__description--status-info',
				title: 'taalert__title--status-info',
				indicator: 'taalert__indicator--status-info'
			},
			success: {
				root: 'taalert--status-success',
				description: 'taalert__description--status-success',
				title: 'taalert__title--status-success',
				indicator: 'taalert__indicator--status-success'
			},
			warning: {
				root: 'taalert--status-warning',
				description: 'taalert__description--status-warning',
				title: 'taalert__title--status-warning',
				indicator: 'taalert__indicator--status-warning'
			},
			danger: {
				root: 'taalert--status-danger',
				description: 'taalert__description--status-danger',
				title: 'taalert__title--status-danger',
				indicator: 'taalert__indicator--status-danger'
			}
		}
	},
	defaultVariants: {
		status: 'default'
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
