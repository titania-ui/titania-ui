import type { Attachment } from 'svelte/attachments';

export interface FocusRingOptions {
	/**
	 * Whether to show the focus ring when something inside the container has
	 * focus (true), or only when the container itself has focus (false).
	 * @default false
	 */
	within?: boolean;
	/** Whether the element is a text input. */
	isTextInput?: boolean;
	/** Whether the element will be auto focused. */
	autoFocus?: boolean;
	/** Called when focus state changes. */
	onFocusChange?: (isFocused: boolean) => void;
	/** Called when focus-visible state changes. */
	onFocusVisibleChange?: (isFocusVisible: boolean) => void;
}

let usingKeyboard = true;
let installed = false;
const subscribers = new Set<() => void>();

function notify() {
	for (const fn of subscribers) fn();
}

function isValidKey(e: KeyboardEvent) {
	return !(e.metaKey || (e.key !== 'Meta' && e.ctrlKey) || e.key === 'Control' || e.key === 'Alt');
}

function onKey(e: KeyboardEvent) {
	if (isValidKey(e) && !usingKeyboard) {
		usingKeyboard = true;
		notify();
	}
}

function onPointer() {
	if (usingKeyboard) {
		usingKeyboard = false;
		notify();
	}
}

function ensureGlobalListeners() {
	if (installed || typeof document === 'undefined') return;
	installed = true;
	document.addEventListener('keydown', onKey, true);
	document.addEventListener('keyup', onKey, true);
	document.addEventListener('pointerdown', onPointer, true);
	document.addEventListener('mousedown', onPointer, true);
	document.addEventListener('touchstart', onPointer, true);
}

function subscribe(fn: () => void): () => void {
	ensureGlobalListeners();
	subscribers.add(fn);
	return () => subscribers.delete(fn);
}

/**
 * Svelte attachment that toggles `data-focus` and `data-focus-visible`
 * attributes on an element, mirroring React Aria's useFocusRing.
 *
 * `data-focus-visible` is set only when the element is focused AND the
 * user is interacting via keyboard — never on mouse/touch focus.
 *
 * Usage:
 *   <button {@attach useFocusRing()}>…</button>
 *   <div {@attach useFocusRing({ within: true })}>…</div>
 */
export function useFocusRing(options: FocusRingOptions = {}): Attachment<Element> {
	return (node) => {
		const { within = false, isTextInput, autoFocus = false } = options;

		let isFocused = false;
		let focusVisible = autoFocus && usingKeyboard;

		const sync = () => {
			const showRing = isFocused && focusVisible;
			node.toggleAttribute('data-focus', showRing);
			options.onFocusVisibleChange?.(showRing);
		};

		const setFocused = (next: boolean) => {
			if (next === isFocused) return;
			isFocused = next;
			focusVisible = next ? usingKeyboard : false;
			options.onFocusChange?.(next);
			sync();
		};

		const onFocusIn = (e: FocusEvent) => {
			if (within || e.target === node) setFocused(true);
		};

		const onFocusOut = (e: FocusEvent) => {
			if (within) {
				if (!node.contains(e.relatedTarget as Node)) setFocused(false);
			} else if (e.target === node) {
				setFocused(false);
			}
		};

		node.addEventListener('focusin', onFocusIn as EventListener);
		node.addEventListener('focusout', onFocusOut as EventListener);

		const unsubscribe = subscribe(() => {
			if (!isFocused) return;
			focusVisible = isTextInput ? focusVisible || usingKeyboard : usingKeyboard;
			sync();
		});

		sync();

		return () => {
			node.removeEventListener('focusin', onFocusIn as EventListener);
			node.removeEventListener('focusout', onFocusOut as EventListener);
			unsubscribe();
			node.removeAttribute('data-focus');
		};
	};
}
