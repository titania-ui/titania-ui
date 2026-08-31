import { tv } from 'tailwind-variants/lite';
import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';

export const theme = tv({
	base: 'talink',
	variants: {
		disabled: {
			true: 'talink--disabled'
		}
	},
	defaultVariants: {
		disabled: false
	}
});

// Root
export type RootCfg = Define<{
	tag: 'a';
	theme: ThemeOf<typeof theme>;
	own: { disabled?: boolean };
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './link.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
