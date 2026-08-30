<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { inputGroupCtx, theme, type PrefixProps } from '../index.ts';
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
	}: PrefixProps<TAs> = $props();

	const cls = $derived(
		theme().prefix({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'control-prefix',
		...rest,
		class: cls
	});
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
