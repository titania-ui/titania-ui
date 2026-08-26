import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tasidebar',
		header: 'tasidebar__header',
		body: 'tasidebar__body',
		footer: 'tasidebar__footer',
		section: 'tasidebar__section',
		item: 'tasidebar__item',
		item_wrapper: 'tasidebar__item__wrapper',
		label: 'tasidebar__label',
		spacer: 'tasidebar__spacer',
		divider: 'tasidebar__divider'
	},
	variants: {
		current: {
			true: {
				item: 'tasidebar__item--current'
			}
		}
	}
});
