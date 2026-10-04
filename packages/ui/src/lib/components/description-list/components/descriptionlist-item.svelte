<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As } from '#lib/types/props.js';
	import { type ItemProps, theme } from '../index.js';

	let {
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		children,
		...rest
	}: ItemProps<TAs> = $props();

	const attrs = $derived({ ...rest, class: theme().item({ className }) });
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
