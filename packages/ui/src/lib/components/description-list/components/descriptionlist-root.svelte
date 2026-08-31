<script lang="ts" generics="TAs extends As | undefined = undefined">
	import type { As } from '#lib/types/props.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { theme, type RootProps } from '../index.js';

	let {
		//
		as: Tag = 'dl',
		ref = $bindable(null),
		class: className = undefined,
		children,
		...rest
	}: RootProps<TAs> = $props();

	const attrs = $derived({ ...rest, class: theme().root({ className }) });
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
