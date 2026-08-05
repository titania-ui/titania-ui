<script lang="ts">
	import { formCtx, type FieldGroupProps } from '../index.ts';

	const ctx = formCtx.get();

	let {
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: FieldGroupProps = $props();

	const mergedProps = $derived({
		'data-slot': 'control',
		...props,
		class: ctx.slots.current.fieldgroup({ class: className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
