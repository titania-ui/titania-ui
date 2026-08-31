import { createAttachmentKey } from 'svelte/attachments';
import { useActivePress } from './useActivePress.js';
import { useFocusRing } from './useFocusRing.js';
import { useHover } from './useHover.js';
import type { As } from '#lib/types/props.js';

export interface PressableTagOptions {
	/** Explicit `as` override; otherwise `'a'` when `href` is set, else `'button'`. */
	as?: () => As | undefined;
	href?: () => string | undefined;
	disabled?: () => boolean | undefined;
	/**
	 * Extra disabled-like state (Button's `pending`): folds into the effective
	 * disabled for hover/press and the `button` attrs, but not the link `onclick`.
	 */
	pending?: () => boolean | undefined;
	/** Fallback for `type` / `tabindex` / `role`, read from the component's leftover attrs. */
	type?: () => unknown;
	/** Link `onclick`, forwarded unless `disabled`. */
	onclick?: () => unknown;
}

export interface PressableTag {
	readonly tag: As;
	/** The hover / focus-ring / active-press attachments only — nothing tag-specific. */
	readonly attachments: Record<string, unknown>;
	/** `attachments` plus the resolved `button` / link attribute branch. */
	readonly attrs: Record<string, unknown>;
	readonly state: { hovered: boolean; pressed: boolean; focused: boolean };
}

export function usePressableTag(options: PressableTagOptions = {}): PressableTag {
	const href = () => options.href?.();
	const disabled = () => options.disabled?.() ?? false;
	const type = () => options.type?.();

	const pressDisabled = $derived(disabled() || (options.pending?.() ?? false));
	const tag = $derived<As>(options.as?.() ?? (href() != null ? 'a' : 'button'));

	let hovered = $state(false);
	let pressed = $state(false);
	let focused = $state(false);

	const HOVER = createAttachmentKey();
	const FOCUS = createAttachmentKey();
	const PRESS = createAttachmentKey();

	const attachments = $derived({
		[HOVER]: useHover({ isDisabled: pressDisabled, onHoverChange: (v) => (hovered = v) }),
		[FOCUS]: useFocusRing({ onFocusVisibleChange: (v) => (focused = v) }),
		[PRESS]: useActivePress({ disabled: pressDisabled, onPressedChange: (v) => (pressed = v) })
	});

	const attrs = $derived({
		...attachments,
		...(tag === 'button'
			? {
					type: type() ?? 'button',
					disabled: pressDisabled || undefined,
					tabindex: type() ?? '0'
				}
			: {
					href: pressDisabled ? undefined : href(),
					'aria-disabled': pressDisabled || undefined,
					tabindex: pressDisabled ? -1 : (type() ?? 0),
					role: pressDisabled ? (type() ?? 'link') : undefined,
					onclick: disabled() ? undefined : options.onclick?.()
				})
	});

	return {
		get tag() {
			return tag;
		},
		get attachments() {
			return attachments;
		},
		get attrs() {
			return attrs;
		},
		get state() {
			return { hovered, pressed, focused };
		}
	};
}
