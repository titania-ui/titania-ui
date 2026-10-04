import type { Attachment } from 'svelte/attachments';

export interface HoverEvent {
	type: 'hoverstart' | 'hoverend';
	target: Element;
	pointerType: 'mouse' | 'pen';
}

export interface HoverHandlers {
	onHoverStart?: (e: HoverEvent) => void;
	onHoverEnd?: (e: HoverEvent) => void;
	/** Called when the hovered state changes. Mirrors `data-hovered`. */
	onHoveredChange?: (hovered: boolean) => void;
}

export interface HoverOptions extends HoverHandlers {
	/** Whether hover handling is disabled. */
	disabled?: boolean | null | undefined;
}

let globalIgnoreEmulatedMouseEvents = false;
let hoverCount = 0;
let cleanupGlobal: (() => void) | undefined;

function setGlobalIgnoreEmulatedMouseEvents() {
	globalIgnoreEmulatedMouseEvents = true;
	setTimeout(() => {
		globalIgnoreEmulatedMouseEvents = false;
	}, 500);
}

function handleGlobalPointerEvent(e: PointerEvent) {
	if (e.pointerType === 'touch') {
		setGlobalIgnoreEmulatedMouseEvents();
	}
}

function setupGlobalTouchEvents(): (() => void) | undefined {
	if (typeof document === 'undefined') return;

	if (hoverCount === 0 && typeof PointerEvent !== 'undefined') {
		document.addEventListener('pointerup', handleGlobalPointerEvent);
		cleanupGlobal = () => document.removeEventListener('pointerup', handleGlobalPointerEvent);
	}

	hoverCount++;
	return () => {
		hoverCount--;
		if (hoverCount === 0) {
			cleanupGlobal?.();
			cleanupGlobal = undefined;
		}
	};
}

/**
 * Svelte attachment that handles pointer hover interactions for an element.
 * Normalizes behavior across browsers and ignores emulated mouse events on touch devices.
 * Toggles a `data-hovered` attribute while hovered.
 *
 * Usage: `<div {@attach useHover({ onHoveredChange: (h) => hovered = h })}>`
 */
export function useHover(options: HoverOptions = {}): Attachment<Element> {
	return (node) => {
		const teardownGlobal = setupGlobalTouchEvents();

		let hovered = false;
		let target: Element | null = null;
		let removeOver: (() => void) | undefined;

		const opts = () => options; // captured by closure; re-read on each event

		const triggerHoverStart = (event: PointerEvent, pointerType: string) => {
			const { disabled } = opts();
			if (
				disabled ||
				pointerType === 'touch' ||
				hovered ||
				!node.contains(event.target as Element)
			) {
				return;
			}

			hovered = true;
			target = event.currentTarget as Element;
			node.setAttribute('data-hovered', 'true');

			const onOver = (e: PointerEvent) => {
				if (hovered && target && !target.contains(e.target as Element)) {
					triggerHoverEnd(e, e.pointerType);
				}
			};
			document.addEventListener('pointerover', onOver, { capture: true });
			removeOver = () => document.removeEventListener('pointerover', onOver, { capture: true });

			opts().onHoverStart?.({
				type: 'hoverstart',
				target,
				pointerType: pointerType as 'mouse' | 'pen'
			});
			opts().onHoveredChange?.(true);
		};

		const triggerHoverEnd = (_event: PointerEvent, pointerType: string) => {
			const prevTarget = target;
			target = null;

			if (pointerType === 'touch' || !hovered || !prevTarget) return;

			hovered = false;
			node.removeAttribute('data-hovered');
			removeOver?.();
			removeOver = undefined;

			opts().onHoverEnd?.({
				type: 'hoverend',
				target: prevTarget,
				pointerType: pointerType as 'mouse' | 'pen'
			});
			opts().onHoveredChange?.(false);
		};

		const onPointerEnter = (e: PointerEvent) => {
			if (globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse') return;
			triggerHoverStart(e, e.pointerType);
		};

		const onPointerLeave = (e: PointerEvent) => {
			if (!opts().disabled && node.contains(e.target as Element)) {
				triggerHoverEnd(e, e.pointerType);
			}
		};

		node.addEventListener('pointerenter', onPointerEnter as EventListener);
		node.addEventListener('pointerleave', onPointerLeave as EventListener);

		return () => {
			node.removeEventListener('pointerenter', onPointerEnter as EventListener);
			node.removeEventListener('pointerleave', onPointerLeave as EventListener);
			node.removeAttribute('data-hovered');
			removeOver?.();
			teardownGlobal?.();
		};
	};
}
