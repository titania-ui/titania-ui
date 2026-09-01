<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { registerId } from '#lib/utils/registerId.js';
	import { type LegendCfg, type LegendProps, fieldsetCtx, formCtx, theme } from '../index.js';

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
		child,
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
		class: cls,
		id
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<LegendCfg>}
	{children}
/>
