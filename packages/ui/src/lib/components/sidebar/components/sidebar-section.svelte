<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { sidebarCtx, theme, type SectionProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

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
