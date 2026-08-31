import type { Define, Props, ThemeOf } from '#lib/types/props.ts';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'input';
	own: { invalid?: boolean; disabled?: boolean };
	theme: ThemeOf<typeof theme>;
}>;
export type RootProps = Props<'input', RootCfg>;
import { default as Root } from './components/input-root.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
