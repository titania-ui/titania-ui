<script lang="ts">
	import {
		ui_alert_status_danger,
		ui_alert_status_success,
		ui_alert_status_warning
	} from '#lib/paraglide/messages.js';
	import { alertDialogCtx } from '../alert-dialog-context.js';
	import type { RootProps, Status } from '../index.js';
	import { AlertDialog as Primitive } from 'bits-ui';
	import { boxWith } from 'svelte-toolbelt';

	// Neutral statuses get no prefix: the title alone says it all
	const STATUS_LABELS: Partial<Record<Status, () => string>> = {
		success: ui_alert_status_success,
		warning: ui_alert_status_warning,
		danger: ui_alert_status_danger
	};

	let {
		open = $bindable(false),
		status = 'default',
		onconfirm = undefined,
		oncancel = undefined,
		children
	}: RootProps = $props();

	let pending = $state(false);
	let confirming = false;

	function setOpen(v: boolean) {
		// An async confirm can't be cancelled halfway (Escape / Cancel are ignored meanwhile)
		if (!v && pending) return;
		if (!v && open && !confirming) oncancel?.();
		open = v;
	}

	async function confirm() {
		const result = onconfirm?.();
		if (result instanceof Promise) {
			pending = true;
			try {
				await result;
			} finally {
				pending = false;
			}
		}
		confirming = true;
		setOpen(false);
		confirming = false;
	}

	alertDialogCtx.set({
		open: boxWith(() => open),
		status: boxWith(() => status),
		statusLabel: boxWith(() => STATUS_LABELS[status]?.() ?? ''),
		pending: boxWith(() => pending),
		confirm
	});
</script>

<Primitive.Root bind:open={() => open, setOpen}>
	{@render children?.({ open, pending })}
</Primitive.Root>
