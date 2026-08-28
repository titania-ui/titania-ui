<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootCfg, type RootProps } from './heading.ts';
	import type { As, ChildArgOf } from '#lib/types/props.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

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
