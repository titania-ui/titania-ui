<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { type RootCfg, type RootProps, theme } from './heading.js';

	let {
		level = 1,
		//
		as: _Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let Tag = $derived(_Tag ?? (`h${level}` as As));

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			level,
			...split.variants,
			class: className
		} as never)
	);

	const attrs = $derived({
		role: 'heading',
		'aria-level': level,
		...split.attrs,
		class: cls
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<RootCfg>}
	{children}
/>
