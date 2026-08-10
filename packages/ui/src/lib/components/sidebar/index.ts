import type { SwitchableTagComponentProps } from '../../types.ts';

// Theme
import { theme, type ThemeVariants } from './theme.ts';
export { theme, type ThemeVariants };

// State
import { sidebarCtx } from './sidebar-context.ts';
export { sidebarCtx };

// Root
export type RootPropsRaw = {};
export type RootProps = SwitchableTagComponentProps<'aside', RootPropsRaw, ThemeVariants>;
import { default as Root } from './components/sidebar-root.svelte';

// Header
export type HeaderPropsRaw = {};
export type HeaderProps = SwitchableTagComponentProps<'div', HeaderPropsRaw, ThemeVariants>;
import { default as Header } from './components/sidebar-header.svelte';

// Body
export type BodyPropsRaw = {};
export type BodyProps = SwitchableTagComponentProps<'div', BodyPropsRaw, ThemeVariants>;
import { default as Body } from './components/sidebar-body.svelte';

// Footer
export type FooterPropsRaw = {};
export type FooterProps = SwitchableTagComponentProps<'div', FooterPropsRaw, ThemeVariants>;
import { default as Footer } from './components/sidebar-footer.svelte';

// Section
export type SectionPropsRaw = {};
export type SectionProps = SwitchableTagComponentProps<'ul', SectionPropsRaw, ThemeVariants>;
import { default as Section } from './components/sidebar-section.svelte';

// Divider
export type DividerPropsRaw = {};
export type DividerProps = Omit<
	SwitchableTagComponentProps<'hr', DividerPropsRaw, ThemeVariants>,
	'children'
>;
import { default as Divider } from './components/sidebar-divider.svelte';

// Label
export type LabelPropsRaw = {};
export type LabelProps = SwitchableTagComponentProps<'span', LabelPropsRaw, ThemeVariants>;
import { default as Label } from './components/sidebar-label.svelte';

// Spacer
export type SpacerPropsRaw = {};
export type SpacerProps = Omit<
	SwitchableTagComponentProps<'div', SpacerPropsRaw, ThemeVariants>,
	'children'
>;
import { default as Spacer } from './components/sidebar-spacer.svelte';

// Item
export type ItemPropsRaw = { current?: boolean; disabled?: boolean };
export type ItemProps = SwitchableTagComponentProps<'a', ItemPropsRaw, ThemeVariants>;
import { default as Item } from './components/sidebar-item.svelte';

const EXPORT = Object.assign(Root, {
	Root,
	Header,
	Body,
	Footer,
	Section,
	Item,
	Label,
	Spacer,
	Divider,
	theme,
	sidebarCtx
});
export default EXPORT;
