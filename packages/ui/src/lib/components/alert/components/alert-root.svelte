<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import {
		ui_alert_status_danger,
		ui_alert_status_info,
		ui_alert_status_success,
		ui_alert_status_warning
	} from '#lib/paraglide/messages.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { alertCtx } from '../alert-context.js';
	import { type RootCfg, type RootProps, theme } from '../index.js';
	import { tick } from 'svelte';
	import { boxWith } from 'svelte-toolbelt';

	const uid = $props.id();

	const STATUS_LABELS: Record<string, () => string> = {
		default: ui_alert_status_info,
		accent: ui_alert_status_info,
		success: ui_alert_status_success,
		warning: ui_alert_status_warning,
		danger: ui_alert_status_danger
	};

	const FOCUSABLE =
		'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

	let {
		dismissed = $bindable(false),
		ondismiss = undefined,
		live = 'auto',
		statusLabel = undefined,
		focusTarget = undefined,
		//
		id = uid,
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const label = $derived(
		statusLabel ?? STATUS_LABELS[String(split.variants.status ?? 'default')]()
	);

	const cls = $derived(
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	function neighbourFocusable(el: HTMLElement): HTMLElement | undefined {
		const all = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
			(e) => e.offsetParent !== null || e === document.activeElement
		);
		const inside = (e: HTMLElement) => el.contains(e);
		const after = all.find(
			(e) => !inside(e) && el.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING
		);
		if (after) return after;
		return all.findLast(
			(e) => !inside(e) && el.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING
		);
	}

	async function restoreFocus() {
		const el = ref as HTMLElement | null;
		// Only move focus when it was inside the alert (e.g. on the dismiss button).
		if (!el || !el.contains(document.activeElement)) return;
		const target =
			(typeof focusTarget === 'function' ? focusTarget() : focusTarget) ?? neighbourFocusable(el);
		await tick();
		target?.focus();
	}

	// Runs before the DOM update, so it also covers `dismissed` being set from outside while focus is still inside the alert.
	$effect.pre(() => {
		if (dismissed) restoreFocus();
	});

	alertCtx.set({
		id: boxWith(() => id),
		variants: boxWith(() => split.variants),
		statusLabel: boxWith(() => label),
		dismissed: boxWith(
			() => dismissed,
			(v) => {
				dismissed = v;
				if (v) ondismiss?.();
			}
		)
	});

	const attrs = $derived({
		'data-slot': 'alert',
		role:
			live === 'off'
				? undefined
				: live === 'assertive'
					? 'alert'
					: live === 'polite'
						? 'status'
						: split.variants.status === 'warning' || split.variants.status === 'danger'
							? 'alert'
							: 'status',
		...split.attrs,
		class: cls,
		id
	});
</script>

{#if !dismissed}
	<Polymorphic
		tag={Tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs } as ChildArgOf<RootCfg>}
		{children}
	/>
{/if}
