import type { SwitchableTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = {};
export type RootProps = SwitchableTagComponentProps<'aside', RootPropsRaw, ThemeVariants>;
import { default as Root } from './components/sidebar-root.svelte';

const EXPORT = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
