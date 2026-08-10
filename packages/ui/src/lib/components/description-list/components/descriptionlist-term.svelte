<script lang="ts">
	import { type TermProps } from '../index.ts';
	import { descriptionListCtx } from '../dl-context.ts';

	const ctx = descriptionListCtx.get();

	let {
		//
		as: Tag = 'dt',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: TermProps = $props();

	const mergedProps = $derived({
		...props,
		class: ctx.slots.current.term({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
