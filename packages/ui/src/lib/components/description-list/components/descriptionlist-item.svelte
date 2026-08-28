<script lang="ts" generics="TAs extends As | undefined = undefined">
	import type { As } from '#lib/types/props.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { theme, type ItemProps } from '../index.ts';

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
