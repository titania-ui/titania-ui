<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { type IndicatorProps, type IndicatorCfg, theme } from '../index.ts';
	import { Icon } from '../../../index.ts';
	import { alertCtx } from '../alert-context.ts';
	import type { As, ChildArgOf } from '../../../types/props.ts';
	import { cx } from 'tailwind-variants/lite';

	const ctx = alertCtx.get();

	let {
		//
		as: _Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: IndicatorProps<TAs> = $props();

	const Tag = $derived(_Tag ?? Icon);

	const cls = $derived(
		cx(
			theme().indicator({
				...ctx.variants.current,
				class: className
			} as never),
			!_Tag && theme().indicator_placeholder()
		)
	);

	const attrs = $derived({
		'data-slot': 'icon',
		...rest,
		class: cls
	});
</script>

{#if child}
	{@render child({
		props: attrs
	} as ChildArgOf<IndicatorCfg>)}
{:else if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs} {children} />
{/if}
