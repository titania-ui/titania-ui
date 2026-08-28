<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { sidebarCtx, theme, type LabelProps } from '../index.ts';
	import type { As } from '#lib/types/props.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: LabelProps<TAs> = $props();

	const cls = $derived(
		theme().label({
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
