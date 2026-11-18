<script lang="ts" generics="TAs extends As | undefined = undefined">
	import CloseButton from '#lib/components/close-button/index.js';
	import type { As } from '#lib/types/props.js';
	import { alertDialogCtx } from '../alert-dialog-context.js';
	import type { CloseProps } from '../index.js';
	import { AlertDialog as Primitive } from 'bits-ui';
	import { mergeProps } from 'svelte-toolbelt';

	const ctx = alertDialogCtx.get();

	let {
		//
		ref = $bindable(null),
		children,
		child: userChild,
		...rest
	}: CloseProps<TAs> = $props();

	const disabled = $derived(ctx.pending.current);
</script>

<!-- Same as Cancel to bits-ui; the marker keeps it from taking initial focus -->
<Primitive.Cancel {disabled}>
	{#snippet child({ props })}
		<CloseButton
			{...mergeProps(rest, props, { 'data-alert-dialog-close': '' }) as Record<string, unknown>}
			{disabled}
			bind:ref={ref as never}
			child={userChild as never}
			{children}
		/>
	{/snippet}
</Primitive.Cancel>
