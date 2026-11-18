<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Button from '#lib/components/button/index.js';
	import { ui_alert_dialog_confirm } from '#lib/paraglide/messages.js';
	import type { As } from '#lib/types/props.js';
	import { alertDialogCtx } from '../alert-dialog-context.js';
	import type { ActionProps } from '../index.js';
	import { AlertDialog as Primitive } from 'bits-ui';
	import { mergeProps } from 'svelte-toolbelt';

	const ctx = alertDialogCtx.get();

	let {
		disabled = false,
		//
		ref = $bindable(null),
		children,
		child: userChild,
		...rest
	}: ActionProps<TAs> = $props();

	// Calling `preventDefault()` in your own onclick skips `onconfirm` and keeps the dialog open.
	function onclick() {
		ctx.confirm();
	}
</script>

{#snippet fallback()}
	{ui_alert_dialog_confirm()}
{/snippet}

<Primitive.Action {disabled}>
	{#snippet child({ props })}
		<Button
			variant={ctx.status.current === 'danger' ? 'danger' : 'primary'}
			{...mergeProps(rest, props, { onclick }) as Record<string, unknown>}
			{disabled}
			pending={ctx.pending.current}
			bind:ref={ref as never}
			child={userChild as never}
			children={(children ?? fallback) as never}
		/>
	{/snippet}
</Primitive.Action>
