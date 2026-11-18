<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type HeaderCfg, type HeaderProps, theme } from '../index.js';

	let {
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: HeaderProps<TAs> = $props();

	const attrs = $derived({
		'data-slot': 'dropdown-header',
		...rest,
		class: theme().header({ class: className } as never)
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<HeaderCfg>}
	{children}
/>
