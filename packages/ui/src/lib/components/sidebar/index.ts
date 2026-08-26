import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';

// Theme
import { theme } from './theme.ts';
export { theme };

// State
import { sidebarCtx } from './sidebar-context.ts';
export { sidebarCtx };

// Root
export type RootCfg = Define<{ tag: 'aside'; theme: ThemeOf<typeof theme> }>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './components/sidebar-root.svelte';

// Header
export type HeaderCfg = Define<{ tag: 'div' }>;
export type HeaderProps<TAs extends As | undefined = undefined> = Props<TAs, HeaderCfg>;
import { default as Header } from './components/sidebar-header.svelte';

// Body
export type BodyCfg = Define<{ tag: 'div' }>;
export type BodyProps<TAs extends As | undefined = undefined> = Props<TAs, BodyCfg>;
import { default as Body } from './components/sidebar-body.svelte';

// Footer
export type FooterCfg = Define<{ tag: 'div' }>;
export type FooterProps<TAs extends As | undefined = undefined> = Props<TAs, FooterCfg>;
import { default as Footer } from './components/sidebar-footer.svelte';

// Section
export type SectionCfg = Define<{ tag: 'ul' }>;
export type SectionProps<TAs extends As | undefined = undefined> = Props<TAs, SectionCfg>;
import { default as Section } from './components/sidebar-section.svelte';

// Spacer
export type SpacerCfg = Define<{ tag: 'div' }>;
export type SpacerProps<TAs extends As | undefined = undefined> = Omit<
	Props<TAs, SpacerCfg>,
	'children'
>;
import { default as Spacer } from './components/sidebar-spacer.svelte';

// Item
export type ItemCfg = Define<{
	tag: 'button';
	when: { href: 'a' };
	own: { current?: boolean; disabled?: boolean; href?: string };
}>;
export type ItemProps<TAs extends As | undefined = undefined> = Props<TAs, ItemCfg>;
import { default as Item } from './components/sidebar-item.svelte';

// Label
export type LabelCfg = Define<{ tag: 'span' }>;
export type LabelProps<TAs extends As | undefined = undefined> = Props<TAs, LabelCfg>;
import { default as Label } from './components/sidebar-label.svelte';

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
