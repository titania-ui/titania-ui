<script lang="ts">
	import type { IndicatorProps } from '../index.ts';
	import { Icon } from '../../../index.ts';
	import { alertCtx } from '../alert-context.ts';

	const ctx = alertCtx.get();

	let {
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: IndicatorProps = $props();

	const mergedProps = $derived<IndicatorProps>({
		'aria-hidden': 'true',
		'data-slot': 'alert-indicator',
		...ctx.attrs.current,
		...props,
		class: ctx.slots.current.indicator({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{#if children}
			{@render children?.()}
		{:else}
			<Icon class={ctx.slots.current.indicatorDefault()} />
		{/if}
	</svelte:element>
{/if}
