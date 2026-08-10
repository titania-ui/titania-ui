<script lang="ts">
	import { type FooterProps } from '../index.ts';
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
	}: FooterProps = $props();

	const mergedProps = $derived({
		...props,
		class: ctx.slots.current.footer({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
