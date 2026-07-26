<script lang="ts">
	import { fieldCtx } from '../form-context.ts';
	import type { ErrorProps } from '../index.ts';

	const ctx = fieldCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'p',
		ref = $bindable(null),
		class: className = undefined,
		render,
		...props
	}: ErrorProps = $props();

	const mergedProps = $derived({
		'data-slot': 'error',
		...ctx.attrs.current,
		...props,
		id,
		class: ctx.slots.current.error({ className })
	});
</script>

{#if ctx.errors.current}
	{#if render}
		{@render render({ props: mergedProps })}
	{:else}
		<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
			{ctx.errors.current[0]}
		</svelte:element>
	{/if}
{/if}
