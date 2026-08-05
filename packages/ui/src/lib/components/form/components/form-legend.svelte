<script lang="ts">
	import { fieldsetCtx, formCtx, type LegendProps } from '../index.ts';

	const form_ctx = formCtx.get();
	const ctx = fieldsetCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: LegendProps = $props();

	$effect.pre(() => {
		ctx.legendId.current = id;
		return () => {
			if (ctx.legendId.current === id) ctx.legendId.current = undefined;
		};
	});

	const mergedProps = $derived({
		'data-slot': 'legend',
		...props,
		class: form_ctx.slots.current.legend({ class: className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
