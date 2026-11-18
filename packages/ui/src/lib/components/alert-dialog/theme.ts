import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		overlay: 'taalertdialog__overlay',
		content: 'taalertdialog__content',
		indicator: 'taalertdialog__indicator',
		indicator_placeholder: 'taalertdialog__indicator--placeholder',
		title: 'taalertdialog__title',
		description: 'taalertdialog__description',
		footer: 'taalertdialog__footer'
	},
	variants: {
		status: {
			default: {
				content: 'taalertdialog__content--status-default',
				indicator: 'taalertdialog__indicator--status-default'
			},
			accent: {
				content: 'taalertdialog__content--status-accent',
				indicator: 'taalertdialog__indicator--status-accent'
			},
			success: {
				content: 'taalertdialog__content--status-success',
				indicator: 'taalertdialog__indicator--status-success'
			},
			warning: {
				content: 'taalertdialog__content--status-warning',
				indicator: 'taalertdialog__indicator--status-warning'
			},
			danger: {
				content: 'taalertdialog__content--status-danger',
				indicator: 'taalertdialog__indicator--status-danger'
			}
		}
	},
	defaultVariants: {
		status: 'default'
	}
});
