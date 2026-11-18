<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type FooterCfg, type FooterProps, theme } from '../index.js';

	let {
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: FooterProps<TAs> = $props();

	const attrs = $derived({
		'data-slot': 'dropdown-footer',
		...rest,
		class: theme().footer({ class: className } as never)
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<FooterCfg>}
	{children}
/>
