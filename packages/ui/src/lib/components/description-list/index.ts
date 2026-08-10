import type { SwitchableTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// State
import { descriptionListCtx } from './dl-context.ts';
export { descriptionListCtx };

// Root
export type RootPropsRaw = {};
export type RootProps = SwitchableTagComponentProps<'dl', RootPropsRaw, ThemeVariants>;
import { default as Root } from './components/descriptionlist-root.svelte';

// Item
export type ItemPropsRaw = {};
export type ItemProps = SwitchableTagComponentProps<'div', ItemPropsRaw>;
import { default as Item } from './components/descriptionlist-item.svelte';

// Term
export type TermPropsRaw = {};
export type TermProps = SwitchableTagComponentProps<'dt', TermPropsRaw>;
import { default as Term } from './components/descriptionlist-term.svelte';

// Description
export type DescriptionPropsRaw = {};
export type DescriptionProps = SwitchableTagComponentProps<'dd', DescriptionPropsRaw>;
import { default as Description } from './components/descriptionlist-description.svelte';

const EXPORT = Object.assign(Root, {
	Root,
	Item,
	Term,
	Description,
	theme,
	descriptionListCtx
});
export default EXPORT;
