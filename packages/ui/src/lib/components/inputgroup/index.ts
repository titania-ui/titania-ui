import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';

import { theme } from './theme.ts';
export { theme };

// State
import { inputGroupCtx } from './inputgroup-context.ts';
export { inputGroupCtx };

// Root
export type RootCfg = Define<{
	tag: 'div';
	theme: ThemeOf<typeof theme>;
	own: { invalid?: boolean };
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './components/inputgroup-root.svelte';

// Prefix
export type PrefixCfg = Define<{ tag: 'div' }>;
export type PrefixProps<TAs extends As | undefined = undefined> = Props<TAs, PrefixCfg>;
import { default as Prefix } from './components/inputgroup-prefix.svelte';

// Prefix
export type SuffixCfg = Define<{ tag: 'div' }>;
export type SuffixProps<TAs extends As | undefined = undefined> = Props<TAs, SuffixCfg>;
import { default as Suffix } from './components/inputgroup-suffix.svelte';

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
