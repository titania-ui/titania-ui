import type { SwitchableTagComponentProps } from '../../types.ts';

// Root
export type RootPropsRaw = { level?: 1 | 2 | 3 | 4 | 5 | 6 };
export type RootProps = SwitchableTagComponentProps<
	'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
	RootPropsRaw
>;
import { default as Root } from './heading.svelte';

export default Root;
