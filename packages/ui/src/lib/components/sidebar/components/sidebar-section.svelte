<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As } from '#lib/types/props.js';
	import { type SectionProps, sidebarCtx, theme } from '../index.js';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'ul',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: SectionProps<TAs> = $props();

	const cls = $derived(
		theme().section({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		...rest,
		class: cls
	});
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
