<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { alertCtx } from '../alert-context.js';
	import { type DescriptionCfg, type DescriptionProps, theme } from '../index.js';

	const ctx = alertCtx.get();

	let {
		//
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: DescriptionProps<TAs> = $props();

	const cls = $derived(
		theme().description({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'alert-description',
		...rest,
		class: cls
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<DescriptionCfg>}
	{children}
/>
