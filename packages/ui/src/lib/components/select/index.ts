import type { FixedTagComponentProps } from '../../types.ts';

import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = {
	value?: unknown;
	invalid?: boolean;
	disabled?: boolean;
	multiple?: boolean;
};
export type RootProps = FixedTagComponentProps<'select', RootPropsRaw, ThemeVariants>;
import { default as Root } from './select-root.svelte';

const EXPORT = Object.assign(Root, { Root, theme });
export default EXPORT;
