import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Root } from './strong.svelte';
import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	base: 'tastrong'
});

// Root
export type RootCfg = Define<{ tag: 'strong'; theme: ThemeOf<typeof theme> }>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
