import type { FixedTagComponentProps } from '../../types.ts';

import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// Root
export type RootPropsRaw = { dismissible?: boolean; dismissed?: boolean };
export type RootProps = Omit<
	FixedTagComponentProps<'div', RootPropsRaw, ThemeVariants>,
	'children'
>;
import { default as Root } from './spinner-root.svelte';

const EXPORT = Object.assign(Root, { Root, theme });
export default EXPORT;
