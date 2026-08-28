<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { fieldsetCtx, formCtx, theme, type LegendProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';
	import { registerId } from '#lib/utils/registerId.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	const form_ctx = formCtx.get();
	const ctx = fieldsetCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'legend',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: LegendProps<TAs> = $props();

	$effect.pre(() => registerId(ctx.legendId, id));

	const cls = $derived(
		theme().legend({
			...form_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'legend',
		...rest,
		class: cls
	});
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
