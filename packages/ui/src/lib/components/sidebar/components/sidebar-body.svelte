<script lang="ts">
	import { type BodyProps } from '../index.ts';
	import { sidebarCtx } from '../sidebar-context.ts';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: BodyProps = $props();

	const mergedProps = $derived({
		...props,
		class: ctx.slots.current.body({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
