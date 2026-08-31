<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootProps } from '../index.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import type { As } from '#lib/types/props.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	let {
		//
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		...rest
	}: RootProps<TAs> = $props();

	const split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			class: className
		} as never)
	);

	const attrs = $derived({
		role: 'status',
		'data-slot': 'icon',
		'aria-hidden': true,
		'aria-label': 'Loading...',
		...split.attrs,
		class: cls
	});
</script>

<Polymorphic tag={Tag as As} {attrs} bind:ref />
