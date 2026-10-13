import type { Attachment } from 'svelte/attachments';

export interface FocusRingOptions {
	/**
	 * Whether to show the focus ring when something inside the container has
	 * focus (true), or only when the container itself has focus (false).
	 * @default false
	 */
	within?: boolean;
	/** Whether the element is a text input. */
	textInput?: boolean;
	/** Whether the element will be auto focused. */
	autoFocus?: boolean;
	/** Called when the focused state changes. Mirrors `data-focused`. */
	onFocusedChange?: (focused: boolean) => void;
	/** Called when the focus-visible state changes. Mirrors `data-focus-visible`. */
	onFocusVisibleChange?: (focusVisible: boolean) => void;
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
 * Svelte attachment that toggles `data-focused` and `data-focus-visible`
 * attributes on an element, mirroring React Aria's useFocusRing.
 *
 * - `data-focused` is set whenever the element has focus.
 * - `data-focus-visible` is set only when the element is focused AND the
 *   user is interacting via keyboard — never on mouse/touch focus.
 *
 * Usage:
 *   <button {@attach useFocusRing()}>…</button>
 *   <div {@attach useFocusRing({ within: true })}>…</div>
 */
export function useFocusRing(options: FocusRingOptions = {}): Attachment<Element> {
	return (node) => {
		const { within = false, textInput = false, autoFocus = false } = options;

		let focused = false;
		let focusVisible = autoFocus && usingKeyboard;
		let lastVisible = false;

		const sync = () => {
			const visible = focused && focusVisible;
			node.toggleAttribute('data-focus-visible', visible);
			if (visible !== lastVisible) {
				lastVisible = visible;
				options.onFocusVisibleChange?.(visible);
			}
		};

		const setFocused = (next: boolean) => {
			if (next === focused) return;
			focused = next;
			focusVisible = next ? usingKeyboard : false;
			node.toggleAttribute('data-focused', next);
			options.onFocusedChange?.(next);
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
			if (!focused) return;
			focusVisible = textInput ? focusVisible || usingKeyboard : usingKeyboard;
			sync();
		});

		sync();

		return () => {
			node.removeEventListener('focusin', onFocusIn as EventListener);
			node.removeEventListener('focusout', onFocusOut as EventListener);
			unsubscribe();
			node.removeAttribute('data-focused');
			node.removeAttribute('data-focus-visible');
		};
	};
}
