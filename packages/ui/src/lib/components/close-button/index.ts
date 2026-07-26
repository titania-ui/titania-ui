import type { FixedTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = {};
export type RootProps = FixedTagComponentProps<'button', RootPropsRaw, ThemeVariants>;
import { default as Root } from './close-button-root.svelte';

const EXPORT = Object.assign(Root, { Root, theme });
export default EXPORT;
