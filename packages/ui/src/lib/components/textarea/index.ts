import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'textarea';
	own: { invalid?: boolean };
	theme: ThemeOf<typeof theme>;
}>;
export type RootProps = Props<'textarea', RootCfg>;
import { default as Root } from './components/textarea-root.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
