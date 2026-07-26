import type { SwitchableTagComponentProps } from '../../types.ts';

// Root
export type RootPropsRaw = { icon?: string };
export type RootProps = Omit<SwitchableTagComponentProps<'span', RootPropsRaw>, 'children'>;
import { default as Root } from './icon.svelte';

export default Root;
