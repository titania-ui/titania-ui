import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';

// Theme
import { theme } from './theme.ts';
export { theme };

// Root
export type RootCfg = Define<{
	tag: 'label';
	own: { required?: boolean; invalid?: boolean };
	theme: ThemeOf<typeof theme>;
	state: { required: boolean; invalid: boolean };
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './components/label-root.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
