<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { inputGroupCtx, theme, type SuffixProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	const ctx = inputGroupCtx.get();

	let {
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: SuffixProps<TAs> = $props();

	const cls = $derived(
		theme().suffix({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'control-suffix',
		...rest,
		class: cls
	});
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
