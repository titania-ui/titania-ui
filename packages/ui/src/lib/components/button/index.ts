import type { FixedTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = { href?: string; disabled?: boolean };
export type RootProps = FixedTagComponentProps<'button' | 'a', RootPropsRaw, ThemeVariants>;
import { default as Root } from './button-root.svelte';

const EXPORT = Object.assign(Root, { Root, theme });
export default EXPORT;
