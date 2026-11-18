<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Button from '#lib/components/button/index.js';
	import { ui_alert_dialog_cancel } from '#lib/paraglide/messages.js';
	import type { As } from '#lib/types/props.js';
	import { alertDialogCtx } from '../alert-dialog-context.js';
	import type { CancelProps } from '../index.js';
	import { AlertDialog as Primitive } from 'bits-ui';
	import { mergeProps } from 'svelte-toolbelt';

	const ctx = alertDialogCtx.get();

	let {
		disabled: _disabled = false,
		//
		ref = $bindable(null),
		children,
		child: userChild,
		...rest
	}: CancelProps<TAs> = $props();

	const disabled = $derived(_disabled || ctx.pending.current);
</script>

{#snippet fallback()}
	{ui_alert_dialog_cancel()}
{/snippet}

<Primitive.Cancel {disabled}>
	{#snippet child({ props })}
		<Button
			variant="secondary"
			{...mergeProps(rest, props) as Record<string, unknown>}
			{disabled}
			bind:ref={ref as never}
			child={userChild as never}
			children={(children ?? fallback) as never}
		/>
	{/snippet}
</Primitive.Cancel>
