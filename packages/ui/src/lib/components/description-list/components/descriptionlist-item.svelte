<script lang="ts">
	import { type ItemProps } from '../index.ts';
	import { descriptionListCtx } from '../dl-context.ts';

	const ctx = descriptionListCtx.get();

	let {
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: ItemProps = $props();

	const mergedProps = $derived({
		...props,
		class: ctx.slots.current.item({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
