import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Description } from './components/descriptionlist-description.svelte';
import { default as Item } from './components/descriptionlist-item.svelte';
import { default as Root } from './components/descriptionlist-root.svelte';
import { default as Term } from './components/descriptionlist-term.svelte';
import { theme } from './theme.js';

export { theme };

// Root
export type RootCfg = Define<{ tag: 'dl'; theme: ThemeOf<typeof theme> }>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

// Item
export type ItemCfg = Define<{ tag: 'div' }>;
export type ItemProps<TAs extends As | undefined = undefined> = Props<TAs, ItemCfg>;

// Term
export type TermCfg = Define<{ tag: 'dt' }>;
export type TermProps<TAs extends As | undefined = undefined> = Props<TAs, TermCfg>;

// Description
export type DescriptionCfg = Define<{ tag: 'dd' }>;
export type DescriptionProps<TAs extends As | undefined = undefined> = Props<TAs, DescriptionCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Item: typeof Item;
	Term: typeof Term;
	Description: typeof Description;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	Item,
	Term,
	Description,
	theme
});
export default EXPORT;
