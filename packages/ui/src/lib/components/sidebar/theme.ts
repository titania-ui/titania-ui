import { tv, type VariantProps } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tasidebar'
	},
	variants: {}
});

export type ThemeVariants = VariantProps<typeof theme>;
