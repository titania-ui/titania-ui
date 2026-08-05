import type { FixedTagComponentProps } from '../../types.ts';

import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = { value?: unknown; invalid?: boolean; disabled?: boolean };
export type RootProps = Omit<
	FixedTagComponentProps<'textarea', RootPropsRaw, ThemeVariants>,
	'children'
>;
import { default as Root } from './textarea-root.svelte';

const EXPORT = Object.assign(Root, { Root, theme });
export default EXPORT;
