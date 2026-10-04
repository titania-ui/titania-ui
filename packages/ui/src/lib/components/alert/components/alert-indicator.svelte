<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { Icon } from '#lib';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { alertCtx } from '../alert-context.js';
	import { type IndicatorCfg, type IndicatorProps, theme } from '../index.js';
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

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<IndicatorCfg>}
	{children}
/>
