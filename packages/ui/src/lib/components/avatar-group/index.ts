import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { theme as avatarTheme } from '../avatar/theme.js';
import { avatarGroupCtx } from './avatar-group-context.js';
import { default as Root } from './components/avatar-group-root.svelte';
import { theme } from './theme.js';

export { theme };

export { avatarGroupCtx };

// Root
export type RootCfg = Define<{
	tag: 'div';
	own: { max?: number };
	theme: ThemeOf<typeof theme> & ThemeOf<typeof avatarTheme>;
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
	avatarGroupCtx: typeof avatarGroupCtx;
} = Object.assign(Root, {
	Root,
	theme,
	avatarGroupCtx
});
export default EXPORT;
