import type { SwitchableTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = { dismissed?: boolean; onDismiss?: () => void };
export type RootProps = SwitchableTagComponentProps<'div', RootPropsRaw, ThemeVariants>;
import { default as Root } from './components/chip-root.svelte';

// Dismiss
export type DismissPropsRaw = {};
export type DismissProps = SwitchableTagComponentProps<'button', DismissPropsRaw>;
import { default as Dismiss } from './components/chip-dismiss.svelte';

const EXPORT = Object.assign(Root, { Root, Dismiss, theme });
export default EXPORT;
