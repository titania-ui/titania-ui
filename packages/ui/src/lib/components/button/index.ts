import type { FixedTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = { href?: string; disabled?: boolean };
export type RootProps = FixedTagComponentProps<'button', RootPropsRaw, ThemeVariants>;
import { default as Root } from './components/button-root.svelte';

// TouchTarget
import TouchTarget from './components/touch-target.svelte';

const EXPORT = Object.assign(Root, { Root, TouchTarget, theme });
export default EXPORT;
