import type { theme as buttonTheme } from '#lib/components/button/theme.js';
import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Content } from './components/dropdown-content.svelte';
import { default as Divider } from './components/dropdown-divider.svelte';
import { default as Footer } from './components/dropdown-footer.svelte';
import { default as Header } from './components/dropdown-header.svelte';
import { default as Item } from './components/dropdown-item.svelte';
import { default as List } from './components/dropdown-list.svelte';
import { default as Root } from './components/dropdown-root.svelte';
import { default as Trigger } from './components/dropdown-trigger.svelte';
import { dropdownCtx, dropdownListCtx } from './dropdown-context.js';
import { theme } from './theme.js';
import type { Snippet } from 'svelte';

export { theme };

export { dropdownCtx, dropdownListCtx };

export type Placement = keyof typeof theme.variants.placement;

// Root (renders no element of its own, only the shared state)
export type RootProps = {
	/** Whether the content is shown. Bindable. */
	open?: boolean;
	/** Where the content sits relative to the trigger. Flips automatically when out of room. */
	placement?: Placement;
	children?: Snippet<[{ open: boolean }]>;
};

// Trigger (a `Button`, so every Button variant / size / color applies)
export type TriggerCfg = Define<{
	tag: 'button';
	own: {
		pending?: boolean;
		pendingLabel?: string;
		disabled?: boolean;
		/** Appends a chevron that flips while open. */
		chevron?: boolean;
	};
	theme: ThemeOf<typeof buttonTheme>;
	state: {
		open: boolean;
		pending: boolean;
		disabled: boolean;
		hovered: boolean;
		pressed: boolean;
		focused: boolean;
	};
	child: true;
}>;
export type TriggerProps<TAs extends As | undefined = undefined> = Props<TAs, TriggerCfg>;

// Content
export type ContentCfg = Define<{ tag: 'div'; state: { open: boolean }; child: true }>;
export type ContentProps<TAs extends As | undefined = undefined> = Props<TAs, ContentCfg>;

// Header
export type HeaderCfg = Define<{ tag: 'div'; child: true }>;
export type HeaderProps<TAs extends As | undefined = undefined> = Props<TAs, HeaderCfg>;

// Footer
export type FooterCfg = Define<{ tag: 'div'; child: true }>;
export type FooterProps<TAs extends As | undefined = undefined> = Props<TAs, FooterCfg>;

// List
export type ListCfg = Define<{ tag: 'ul'; child: true }>;
export type ListProps<TAs extends As | undefined = undefined> = Props<TAs, ListCfg>;

// Item
export type ItemCfg = Define<{
	tag: 'div';
	when: { href: 'a' };
	own: {
		href?: string;
		disabled?: boolean;
		/** Destructive action styling. */
		danger?: boolean;
		/** Drops the hover background, e.g. for a static list of checkboxes. */
		plain?: boolean;
	};
	state: {
		disabled: boolean;
		hovered: boolean;
		pressed: boolean;
		focused: boolean;
	};
	child: true;
}>;
export type ItemProps<
	TAs extends As | undefined = undefined,
	THref extends string | undefined = undefined
> = Props<TAs, ItemCfg, THref>;

// Divider
export type DividerCfg = Define<{ tag: 'hr' }>;
export type DividerProps<TAs extends As | undefined = undefined> = Props<TAs, DividerCfg> & {
	children?: never;
};

const EXPORT: typeof Root & {
	Root: typeof Root;
	Trigger: typeof Trigger;
	Content: typeof Content;
	Header: typeof Header;
	Footer: typeof Footer;
	List: typeof List;
	Item: typeof Item;
	Divider: typeof Divider;
	theme: typeof theme;
	dropdownCtx: typeof dropdownCtx;
} = Object.assign(Root, {
	Root,
	Trigger,
	Content,
	Header,
	Footer,
	List,
	Item,
	Divider,
	theme,
	dropdownCtx
});
export default EXPORT;
