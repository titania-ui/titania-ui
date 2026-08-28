<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type LabelProps } from '../index.ts';
	import { chipCtx } from '../chip-context.ts';
	import type { As } from '#lib/types/props.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	const ctx = chipCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'span',
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
		class: cls,
		id
	});
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
