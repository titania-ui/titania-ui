import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { default as Body } from './components/sidebar-body.svelte';
import { default as Footer } from './components/sidebar-footer.svelte';
import { default as Header } from './components/sidebar-header.svelte';
import { default as Item } from './components/sidebar-item.svelte';
import { default as Label } from './components/sidebar-label.svelte';
import { default as Root } from './components/sidebar-root.svelte';
import { default as Section } from './components/sidebar-section.svelte';
import { default as Spacer } from './components/sidebar-spacer.svelte';
import { sidebarCtx } from './sidebar-context.js';
import { theme } from './theme.js';

export { theme };

export { sidebarCtx };

// Root
export type RootCfg = Define<{ tag: 'aside'; theme: ThemeOf<typeof theme> }>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;

// Header
export type HeaderCfg = Define<{ tag: 'div' }>;
export type HeaderProps<TAs extends As | undefined = undefined> = Props<TAs, HeaderCfg>;

// Body
export type BodyCfg = Define<{ tag: 'div' }>;
export type BodyProps<TAs extends As | undefined = undefined> = Props<TAs, BodyCfg>;

// Footer
export type FooterCfg = Define<{ tag: 'div' }>;
export type FooterProps<TAs extends As | undefined = undefined> = Props<TAs, FooterCfg>;

// Section
export type SectionCfg = Define<{ tag: 'ul' }>;
export type SectionProps<TAs extends As | undefined = undefined> = Props<TAs, SectionCfg>;

// Spacer
export type SpacerCfg = Define<{ tag: 'div' }>;
export type SpacerProps<TAs extends As | undefined = undefined> = Props<TAs, SpacerCfg> & {
	children?: never;
};

// Item
export type ItemCfg = Define<{
	tag: 'button';
	when: { href: 'a' };
	own: { current?: boolean; disabled?: boolean; href?: string };
	state: {
		disabled: boolean;
		current: boolean;
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

// Label
export type LabelCfg = Define<{ tag: 'span' }>;
export type LabelProps<TAs extends As | undefined = undefined> = Props<TAs, LabelCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Header: typeof Header;
	Body: typeof Body;
	Footer: typeof Footer;
	Section: typeof Section;
	Item: typeof Item;
	Spacer: typeof Spacer;
	Label: typeof Label;
	theme: typeof theme;
	sidebarCtx: typeof sidebarCtx;
} = Object.assign(Root, {
	Root,
	Header,
	Body,
	Footer,
	Section,
	Item,
	Spacer,
	Label,
	theme,
	sidebarCtx
});
export default EXPORT;
