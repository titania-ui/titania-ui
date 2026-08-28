<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootCfg, type RootProps } from './icon.ts';
	import type { As, ChildArgOf } from '#lib/types/props.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { cx } from 'tailwind-variants/lite';

	let {
		icon = undefined,
		//
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			class: cx(className, icon)
		} as never)
	);

	const attrs = $derived({
		role: 'img',
		'aria-hidden': 'true',
		'data-slot': 'icon',
		...split.attrs,
		class: cls
	});
</script>

<Polymorphic
	tag={Tag as As}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<RootCfg>}
/>
