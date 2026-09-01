<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As } from '#lib/types/props.js';
	import { type SpacerProps, sidebarCtx, theme } from '../index.js';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		...rest
	}: SpacerProps<TAs> = $props();

	const cls = $derived(
		theme().spacer({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		...rest,
		class: cls
	});
</script>

<Polymorphic tag={Tag as As} {attrs} bind:ref />
