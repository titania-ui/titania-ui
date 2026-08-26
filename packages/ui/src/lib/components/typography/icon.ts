import { tv } from 'tailwind-variants/lite';
import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';

export const theme = tv({
	base: 'taicon'
});

// Root
export type RootCfg = Define<{ tag: 'span'; theme: ThemeOf<typeof theme>; own: { icon?: string } }>;
export type RootProps<TAs extends As | undefined = undefined> = Omit<
	Props<TAs, RootCfg>,
	'children'
>;
import { default as Root } from './icon.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
