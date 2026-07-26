<script lang="ts">
	import { alertCtx } from '../alert-context.ts';
	import type { DescriptionProps } from '../index.ts';

	const ctx = alertCtx.get();
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

	$effect.pre(() => {
		ctx.descriptionId.current = id;
		return () => {
			if (ctx.descriptionId.current === id) ctx.descriptionId.current = undefined;
		};
	});

	const mergedProps = $derived<DescriptionProps>({
		'data-slot': 'alert-description',
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
