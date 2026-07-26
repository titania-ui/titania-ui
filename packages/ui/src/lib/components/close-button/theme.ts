import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'taclosebutton'
	}
});

export type ThemeVariants = VariantProps<typeof theme>;
