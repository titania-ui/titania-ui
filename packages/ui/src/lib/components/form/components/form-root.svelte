<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { announce } from '#lib/helpers/announcer.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { ui_form_errors_announcement } from '#lib/paraglide/messages.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { collectFormErrors } from '#lib/utils/formErrors.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { formCtx } from '../form-context.js';
	import { type RootCfg, type RootProps, theme } from '../index.js';
	import { tick } from 'svelte';
	import { boxWith } from 'svelte-toolbelt';
	import { createAttachmentKey, fromAction } from 'svelte/attachments';
	import { fromStore } from 'svelte/store';

	const uid = $props.id();

	let {
		form,
		focus = 'auto',
		announceErrors = (count: number) => ui_form_errors_announcement({ count }),
		//
		id = uid,
		as: Tag = 'form',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const __constraints = $derived(fromStore(form.constraints).current);
	const __errors = $derived(fromStore(form.errors).current);

	let submitPending = $state(false);
	let awaitingErrors = false;
	let pendingTimer: ReturnType<typeof setTimeout> | undefined;

	function onsubmitCapture() {
		submitPending = true;
		awaitingErrors = true;
		clearTimeout(pendingTimer);
		// Give up waiting for errors (e.g. the submit succeeded).
		pendingTimer = setTimeout(() => (submitPending = awaitingErrors = false), 10000);
	}

	$effect(() => {
		const list = collectFormErrors(__errors);
		if (!awaitingErrors || list.length === 0) return;
		awaitingErrors = false;
		clearTimeout(pendingTimer);
		// Keep field-level announcements quiet a little longer than their own debounce.
		pendingTimer = setTimeout(() => (submitPending = false), 2000);
		// Moving focus already makes screen readers read the summary or the field. A live
		// announcement on top of it is interrupted or doubled, so it is only for focus="none".
		if (focus === 'none') {
			announce(announceErrors(list.length), { politeness: 'assertive' });
			return;
		}
		tick().then(() => {
			const root = ref as HTMLElement | null;
			if (!root) return;
			const summary = root.querySelector<HTMLElement>('[data-slot="error-summary"]');
			if (focus !== 'field' && summary) return summary.focus();
			if (focus === 'summary') return;
			root.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
		});
	});

	formCtx.set({
		submitPending: boxWith(() => submitPending),
		id: boxWith(() => id),
		variants: boxWith(() => split.variants),

		form: boxWith(() => form),
		constraints: boxWith(() => __constraints),
		errors: boxWith(() => __errors)
	});

	const cls = $derived(
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	const ENHANCE = createAttachmentKey();

	const attrs = $derived({
		'data-slot': 'form',
		method: 'POST',
		enctype: 'multipart/form-data',
		novalidate: true,
		...split.attrs,
		onsubmitcapture: onsubmitCapture,
		[ENHANCE]: fromAction(form.enhance),
		class: cls,
		id
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<RootCfg>}
	{children}
/>
