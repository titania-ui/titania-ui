<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { type RootProps, theme } from './text.js';

	let {
		//
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			class: className
		} as never)
	);

	const attrs = $derived({ 'data-slot': 'text', ...split.attrs, class: cls });
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
