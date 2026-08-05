<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import { fieldsetCtx, formCtx, type FieldsetProps } from '../index.ts';

	const form_ctx = formCtx.get();

	let {
		//
		as: Tag = 'fieldset',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: FieldsetProps = $props();

	const ctx = fieldsetCtx.set({
		legendId: box<string | undefined>(undefined)
	});

	const mergedProps = $derived({
		'aria-labelledby': ctx.legendId.current,
		...props,
		class: form_ctx.slots.current.fieldset({ class: className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
