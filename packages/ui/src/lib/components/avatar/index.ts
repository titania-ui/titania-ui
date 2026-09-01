import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';
import { avatarCtx } from './avatar-context.js';
import { default as Fallback } from './components/avatar-fallback.svelte';
import { default as Image } from './components/avatar-image.svelte';
import { default as Root } from './components/avatar-root.svelte';
import { theme } from './theme.js';

export { theme };

// Root
export type RootCfg = Define<{
	tag: 'span';
	theme: ThemeOf<typeof theme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

// Image
export type ImageCfg = Define<{ tag: 'img'; child: true }>;
export type ImageProps<TAs extends As | undefined = undefined> = Props<TAs, ImageCfg>;

// Fallback
export type FallbackCfg = Define<{ tag: 'span'; child: true }>;
export type FallbackProps<TAs extends As | undefined = undefined> = Props<TAs, FallbackCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Image: typeof Image;
	Fallback: typeof Fallback;
	theme: typeof theme;
	avatarCtx: typeof avatarCtx;
} = Object.assign(Root, {
	Root,
	Image,
	Fallback,
	theme,
	avatarCtx
});
export default EXPORT;
