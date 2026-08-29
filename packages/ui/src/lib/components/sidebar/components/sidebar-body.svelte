<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { sidebarCtx, theme, type BodyProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: BodyProps<TAs> = $props();

	const cls = $derived(
		theme().body({
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
