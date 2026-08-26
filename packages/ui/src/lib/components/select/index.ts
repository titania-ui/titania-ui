import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'select';
	own: { invalid?: boolean; multiple?: boolean };
	theme: ThemeOf<typeof theme>;
}>;
export type RootProps = Props<'input', RootCfg>;
import { default as Root } from './components/select-root.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
