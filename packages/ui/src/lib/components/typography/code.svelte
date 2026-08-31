<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootProps } from './code.ts';
	import type { As } from '#lib/types/props.ts';
	import { splitVariants } from '#lib/utils/splitVariants.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	let {
		//
		as: Tag = 'code',
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

	const attrs = $derived({ ...split.attrs, class: cls });
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
