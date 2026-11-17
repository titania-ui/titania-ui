import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		trigger: 'tadropdown__trigger',
		chevron: 'tadropdown__chevron',
		content: 'tadropdown__content',
		header: 'tadropdown__header',
		footer: 'tadropdown__footer',
		list: 'tadropdown__list',
		item_wrapper: 'tadropdown__item__wrapper',
		item: 'tadropdown__item',
		divider: 'tadropdown__divider'
	},
	variants: {
		placement: {
			'bottom-start': { content: 'tadropdown__content--placement-bottom-start' },
			bottom: { content: 'tadropdown__content--placement-bottom' },
			'bottom-end': { content: 'tadropdown__content--placement-bottom-end' },
			'top-start': { content: 'tadropdown__content--placement-top-start' },
			top: { content: 'tadropdown__content--placement-top' },
			'top-end': { content: 'tadropdown__content--placement-top-end' },
			'right-start': { content: 'tadropdown__content--placement-right-start' },
			right: { content: 'tadropdown__content--placement-right' },
			'right-end': { content: 'tadropdown__content--placement-right-end' },
			'left-start': { content: 'tadropdown__content--placement-left-start' },
			left: { content: 'tadropdown__content--placement-left' },
			'left-end': { content: 'tadropdown__content--placement-left-end' }
		},
		danger: {
			true: { item: 'tadropdown__item--danger' }
		},
		plain: {
			true: { item: 'tadropdown__item--plain' }
		},
		disabled: {
			true: { item: 'tadropdown__item--disabled' }
		}
	},
	defaultVariants: {
		placement: 'bottom-start'
	}
});
