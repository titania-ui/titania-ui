<script lang="ts">
	import { alertCtx } from '../alert-context.ts';
	import type { TitleProps } from '../index.ts';

	const ctx = alertCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'h3',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: TitleProps = $props();

	$effect.pre(() => {
		ctx.titleId.current = id;
		return () => {
			if (ctx.titleId.current === id) ctx.titleId.current = undefined;
		};
	});

	const mergedProps = $derived<TitleProps>({
		'data-slot': 'alert-title',
		...ctx.attrs.current,
		...props,
		id,
		class: ctx.slots.current.title({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
