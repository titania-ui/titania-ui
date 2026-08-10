<script lang="ts">
	import { type SectionProps } from '../index.ts';
	import { sidebarCtx } from '../sidebar-context.ts';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'ul',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: SectionProps = $props();

	const mergedProps = $derived({
		'data-slot': 'section',
		...props,
		class: ctx.slots.current.section({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
