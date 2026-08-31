import type { Attachment } from 'svelte/attachments';

export interface ActivePressOptions {
	/** Whether press handling is disabled. */
	disabled?: boolean;
	/** Called when the active-press state changes. */
	onPressedChange?: (pressed: boolean) => void;
}

type Rect = { left: number; right: number; top: number; bottom: number };

function pointerRectFromPointerEvent(event: PointerEvent): Rect {
	const offsetX = event.width / 2;
	const offsetY = event.height / 2;
	return {
		top: event.clientY - offsetY,
		right: event.clientX + offsetX,
		bottom: event.clientY + offsetY,
		left: event.clientX - offsetX
	};
}

function areRectsOverlapping(a: Rect | null, b: Rect | null) {
	if (!a || !b) return false;
	if (a.right < b.left || a.left > b.right) return false;
	if (a.bottom < b.top || a.top > b.bottom) return false;
	return true;
}

/**
 * Svelte attachment that tracks whether an element is being actively pressed
 * and toggles a `data-active` attribute, mirroring Headless UI's useActivePress.
 *
 * Uses `pointermove` + geometry overlap instead of `pointerleave`, since
 * iOS Safari fires `pointerleave` inconsistently.
 *
 * Usage:
 *   <button {@attach useActivePress()}>…</button>
 *   <button {@attach useActivePress({ onPressedChange: (p) => pressed = p })}>…</button>
 */
export function useActivePress(options: ActivePressOptions = {}): Attachment<Element> {
	return (node) => {
		if (options.disabled) return;

		let target: HTMLElement | null = null;
		let pressed = false;

		let disposables: (() => void)[] = [];
		const dispose = () => {
			for (const d of disposables) d();
			disposables = [];
		};
		const add = <K extends keyof DocumentEventMap>(
			el: Document | Element,
			type: K,
			fn: (e: DocumentEventMap[K]) => void,
			capture = false
		) => {
			el.addEventListener(type, fn as EventListener, capture);
			disposables.push(() => el.removeEventListener(type, fn as EventListener, capture));
		};

		const setPressed = (next: boolean) => {
			if (next === pressed) return;
			pressed = next;
			node.toggleAttribute('data-active', next);
			options.onPressedChange?.(next);
		};

		const reset = () => {
			target = null;
			setPressed(false);
			dispose();
		};

		const onPointerDown = (event: PointerEvent) => {
			dispose();
			if (target !== null) return;

			target = event.currentTarget as HTMLElement;
			setPressed(true);

			const owner = (event.currentTarget as Element).ownerDocument;

			add(owner, 'pointerup', reset);

			add(owner, 'pointermove', (e: PointerEvent) => {
				if (target) {
					const pointerRect = pointerRectFromPointerEvent(e);
					setPressed(areRectsOverlapping(pointerRect, target.getBoundingClientRect()));
				}
			});

			add(owner, 'pointercancel', reset);
		};

		node.addEventListener('pointerdown', onPointerDown as EventListener);
		node.addEventListener('click', reset);

		return () => {
			node.removeEventListener('pointerdown', onPointerDown as EventListener);
			node.removeEventListener('click', reset);
			dispose();
			node.removeAttribute('data-active');
		};
	};
}
