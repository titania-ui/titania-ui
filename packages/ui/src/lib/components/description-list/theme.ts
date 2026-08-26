import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tadescriptionlist',
		item: 'tadescriptionlist__item',
		term: 'tadescriptionlist__term',
		description: 'tadescriptionlist__description'
	}
});
