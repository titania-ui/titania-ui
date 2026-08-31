import { tv } from 'tailwind-variants/lite';
import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';

export const theme = tv({
	base: 'tacode'
});

// Root
export type RootCfg = Define<{ tag: 'code'; theme: ThemeOf<typeof theme> }>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './code.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
