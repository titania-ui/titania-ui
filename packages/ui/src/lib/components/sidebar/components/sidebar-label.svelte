<script lang="ts">
	import { type LabelProps } from '../index.ts';
	import { sidebarCtx } from '../sidebar-context.ts';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'span',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: LabelProps = $props();

	const mergedProps = $derived({
		...props,
		class: ctx.slots.current.label({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
