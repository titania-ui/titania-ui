<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As } from '#lib/types/props.js';
	import { type DescriptionProps, theme } from '../index.js';

	let {
		//
		as: Tag = 'dd',
		ref = $bindable(null),
		class: className = undefined,
		children,
		...rest
	}: DescriptionProps<TAs> = $props();

	const attrs = $derived({ ...rest, class: theme().description({ className }) });
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
