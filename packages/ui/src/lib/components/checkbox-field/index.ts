import type { As } from '#lib/types/props.js';
import type { RootProps as FieldRootProps } from '../field/index.js';
import { default as Root } from './components/checkbox-field-root.svelte';
import { theme } from './theme.js';

export { theme };

// Root
export type RootProps<TAs extends As | undefined = undefined> = FieldRootProps<TAs>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
