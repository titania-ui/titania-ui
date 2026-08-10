<script lang="ts">
	import { type DividerProps } from '../index.ts';
	import { sidebarCtx } from '../sidebar-context.ts';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		...props
	}: DividerProps = $props();

	const mergedProps = $derived({
		...props,
		class: ctx.slots.current.divider({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps} />
{/if}
