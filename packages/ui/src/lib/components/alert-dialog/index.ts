import type { CloseButton, Icon } from '#lib';
import type { theme as buttonTheme } from '#lib/components/button/theme.js';
import type { As, Define, Props, ThemeOf } from '#lib/types/props.js';
import { alertDialogCtx } from './alert-dialog-context.js';
import { default as Action } from './components/alert-dialog-action.svelte';
import { default as Cancel } from './components/alert-dialog-cancel.svelte';
import { default as Close } from './components/alert-dialog-close.svelte';
import { default as Content } from './components/alert-dialog-content.svelte';
import { default as Description } from './components/alert-dialog-description.svelte';
import { default as Footer } from './components/alert-dialog-footer.svelte';
import { default as Indicator } from './components/alert-dialog-indicator.svelte';
import { default as Root } from './components/alert-dialog-root.svelte';
import { default as Title } from './components/alert-dialog-title.svelte';
import { default as Trigger } from './components/alert-dialog-trigger.svelte';
import { theme } from './theme.js';
import type { Snippet } from 'svelte';

export { theme };

export { alertDialogCtx };

export type Status = keyof typeof theme.variants.status;

type PressState = { hovered: boolean; pressed: boolean; focused: boolean };

// Root (renders no element of its own, only the shared state)
export type RootProps = {
	/** Whether the dialog is shown. Bindable. */
	open?: boolean;
	/** Tints the indicator and picks the default `Action` variant (`danger` for `danger`). */
	status?: Status;
	/**
	 * Called by `AlertDialog.Action`. The dialog closes afterwards; return a promise to keep
	 * it open (with the action pending) until it resolves. A rejection keeps it open.
	 */
	onconfirm?: () => unknown;
	/** Called when the dialog closes without confirming (Cancel, Close or Escape). */
	oncancel?: () => void;
	children?: Snippet<[{ open: boolean; pending: boolean }]>;
};

// Trigger (a `Button`, so every Button variant / size / color applies)
export type TriggerCfg = Define<{
	tag: 'button';
	own: { pending?: boolean; pendingLabel?: string; disabled?: boolean };
	theme: ThemeOf<typeof buttonTheme>;
	state: PressState & { open: boolean; pending: boolean; disabled: boolean };
	as: false;
	child: true;
}>;
export type TriggerProps<TAs extends As | undefined = undefined> = Props<TAs, TriggerCfg>;

// Content (portal + backdrop + the `alertdialog` itself)
export type ContentCfg = Define<{
	tag: 'div';
	own: {
		/** Portal target. Defaults to `body`. */
		to?: string | HTMLElement;
	};
	as: false;
	child: true;
}>;
export type ContentProps<TAs extends As | undefined = undefined> = Props<TAs, ContentCfg>;

// Close (a `CloseButton` in the corner that cancels)
export type CloseCfg = Define<{ tag: typeof CloseButton; as: false; child: true }>;
export type CloseProps<TAs extends As | undefined = undefined> = Props<TAs, CloseCfg>;

// Indicator
export type IndicatorCfg = Define<{ tag: typeof Icon; child: true }>;
export type IndicatorProps<TAs extends As | undefined = undefined> = Props<TAs, IndicatorCfg>;

// Title
export type TitleCfg = Define<{ tag: 'h2'; child: true }>;
export type TitleProps<TAs extends As | undefined = undefined> = Props<TAs, TitleCfg>;

// Description
export type DescriptionCfg = Define<{ tag: 'p'; child: true }>;
export type DescriptionProps<TAs extends As | undefined = undefined> = Props<TAs, DescriptionCfg>;

// Footer (renders a default Cancel + Action pair when empty)
export type FooterCfg = Define<{ tag: 'div'; child: true }>;
export type FooterProps<TAs extends As | undefined = undefined> = Props<TAs, FooterCfg>;

// Cancel / Action (`Button`s wired to the dialog)
export type ButtonCfg = Define<{
	tag: 'button';
	own: { disabled?: boolean };
	theme: ThemeOf<typeof buttonTheme>;
	state: PressState & { pending: boolean; disabled: boolean };
	as: false;
	child: true;
}>;
export type CancelProps<TAs extends As | undefined = undefined> = Props<TAs, ButtonCfg>;
export type ActionProps<TAs extends As | undefined = undefined> = Props<TAs, ButtonCfg>;

const EXPORT: typeof Root & {
	Root: typeof Root;
	Trigger: typeof Trigger;
	Content: typeof Content;
	Close: typeof Close;
	Indicator: typeof Indicator;
	Title: typeof Title;
	Description: typeof Description;
	Footer: typeof Footer;
	Cancel: typeof Cancel;
	Action: typeof Action;
	theme: typeof theme;
	alertDialogCtx: typeof alertDialogCtx;
} = Object.assign(Root, {
	Root,
	Trigger,
	Content,
	Close,
	Indicator,
	Title,
	Description,
	Footer,
	Cancel,
	Action,
	theme,
	alertDialogCtx
});
export default EXPORT;
