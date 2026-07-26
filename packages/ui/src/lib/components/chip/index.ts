import type { SwitchableTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = {};
export type RootProps = SwitchableTagComponentProps<'div', RootPropsRaw, ThemeVariants>;
import { default as Root } from './chip-root.svelte';

const EXPORT = Object.assign(Root, { Root, theme });
export default EXPORT;
