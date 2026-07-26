<script lang="ts">
	import { fieldCtx } from '../form-context.ts';
	import type { LabelProps } from '../index.ts';

	const ctx = fieldCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'label',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: LabelProps = $props();

	$effect.pre(() => {
		ctx.labelId.current = id;
		return () => {
			if (ctx.labelId.current === id) ctx.labelId.current = undefined;
		};
	});

	const mergedProps = $derived({
		'data-slot': 'label',
		for: ctx.name.current,
		...ctx.attrs.current,
		...props,
		id,
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
