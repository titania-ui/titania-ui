<script lang="ts" generics="TAs extends As | undefined = undefined">
	import type { As } from '#lib/types/props.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { theme, type TermProps } from '../index.js';

	let {
		//
		as: Tag = 'dt',
		ref = $bindable(null),
		class: className = undefined,
		children,
		...rest
	}: TermProps<TAs> = $props();

	const attrs = $derived({ ...rest, class: theme().term({ className }) });
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
