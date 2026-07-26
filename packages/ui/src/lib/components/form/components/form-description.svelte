<script lang="ts">
	import { fieldCtx } from '../form-context.ts';
	import type { DescriptionProps } from '../index.ts';

	const ctx = fieldCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'p',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: DescriptionProps = $props();

	const mergedProps = $derived({
		'data-slot': 'description',
		...ctx.attrs.current,
		...props,
		id,
		class: ctx.slots.current.description({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
