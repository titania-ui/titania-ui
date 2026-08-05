import type { Attachment } from 'svelte/attachments';

export interface HoverEvent {
	type: 'hoverstart' | 'hoverend';
	target: Element;
	pointerType: 'mouse' | 'pen';
}

export interface HoverHandlers {
	onHoverStart?: (e: HoverEvent) => void;
	onHoverEnd?: (e: HoverEvent) => void;
	onHoverChange?: (isHovering: boolean) => void;
}

export interface HoverOptions extends HoverHandlers {
	isDisabled?: boolean | null | undefined;
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
 *
 * Usage: `<div {@attach useHover({ onHoverChange: (h) => isHovered = h })}>`
 */
export function useHover(options: HoverOptions = {}): Attachment<Element> {
	return (node) => {
		const teardownGlobal = setupGlobalTouchEvents();

		let isHovered = false;
		let target: Element | null = null;
		let removeOver: (() => void) | undefined;

		const opts = () => options; // captured by closure; re-read on each event

		const triggerHoverStart = (event: PointerEvent, pointerType: string) => {
			const { isDisabled } = opts();
			if (
				isDisabled ||
				pointerType === 'touch' ||
				isHovered ||
				!node.contains(event.target as Element)
			) {
				return;
			}

			isHovered = true;
			target = event.currentTarget as Element;
			node.setAttribute('data-hover', 'true');

			const onOver = (e: PointerEvent) => {
				if (isHovered && target && !target.contains(e.target as Element)) {
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
			opts().onHoverChange?.(true);
		};

		const triggerHoverEnd = (_event: PointerEvent, pointerType: string) => {
			const prevTarget = target;
			target = null;

			if (pointerType === 'touch' || !isHovered || !prevTarget) return;

			isHovered = false;
			node.removeAttribute('data-hover');
			removeOver?.();
			removeOver = undefined;

			opts().onHoverEnd?.({
				type: 'hoverend',
				target: prevTarget,
				pointerType: pointerType as 'mouse' | 'pen'
			});
			opts().onHoverChange?.(false);
		};

		const onPointerEnter = (e: PointerEvent) => {
			if (globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse') return;
			triggerHoverStart(e, e.pointerType);
		};

		const onPointerLeave = (e: PointerEvent) => {
			if (!opts().isDisabled && node.contains(e.target as Element)) {
				triggerHoverEnd(e, e.pointerType);
			}
		};

		node.addEventListener('pointerenter', onPointerEnter as EventListener);
		node.addEventListener('pointerleave', onPointerLeave as EventListener);

		return () => {
			node.removeEventListener('pointerenter', onPointerEnter as EventListener);
			node.removeEventListener('pointerleave', onPointerLeave as EventListener);
			node.removeAttribute('data-hover');
			removeOver?.();
			teardownGlobal?.();
		};
	};
}
