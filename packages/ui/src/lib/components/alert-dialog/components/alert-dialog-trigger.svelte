<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Button from '#lib/components/button/index.js';
	import type { As } from '#lib/types/props.js';
	import { alertDialogCtx } from '../alert-dialog-context.js';
	import type { TriggerProps } from '../index.js';
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
	}: TriggerProps<TAs> = $props();

	const open = $derived(ctx.open.current);
</script>

{#snippet body(state: Record<string, unknown>)}
	{@render children?.({ ...state, open } as never)}
{/snippet}

{#snippet asChild(arg: Record<string, unknown>)}
	{@render userChild?.({ ...arg, open } as never)}
{/snippet}

<!-- bits-ui owns the open state and aria wiring, Button owns the look -->
<Primitive.Trigger {disabled}>
	{#snippet child({ props })}
		<Button
			{...mergeProps(rest, props) as Record<string, unknown>}
			{disabled}
			bind:ref={ref as never}
			child={userChild ? (asChild as never) : undefined}
			children={body as never}
		/>
	{/snippet}
</Primitive.Trigger>
