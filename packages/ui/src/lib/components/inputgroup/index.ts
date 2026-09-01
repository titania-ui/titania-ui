import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Prefix } from './components/inputgroup-prefix.svelte';
import { default as Root } from './components/inputgroup-root.svelte';
import { default as Suffix } from './components/inputgroup-suffix.svelte';
import { inputGroupCtx } from './inputgroup-context.js';
import { theme } from './theme.js';

export { theme };

export { inputGroupCtx };

// Root
export type RootCfg = Define<{
	tag: 'div';
	theme: ThemeOf<typeof theme>;
	own: { invalid?: boolean; disabled?: boolean };
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

// Prefix
export type PrefixCfg = Define<{ tag: 'div' }>;
export type PrefixProps<TAs extends As | undefined = undefined> = Props<TAs, PrefixCfg>;

// Prefix
export type SuffixCfg = Define<{ tag: 'div' }>;
export type SuffixProps<TAs extends As | undefined = undefined> = Props<TAs, SuffixCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Prefix: typeof Prefix;
	Suffix: typeof Suffix;
	theme: typeof theme;
	inputGroupCtx: typeof inputGroupCtx;
} = Object.assign(Root, {
	Root,
	Prefix,
	Suffix,
	theme,
	inputGroupCtx
});
export default EXPORT;
