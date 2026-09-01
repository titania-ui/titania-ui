<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As } from '#lib/types/props.js';
	import { type BodyProps, sidebarCtx, theme } from '../index.js';

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
