<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { alertCtx } from '../alert-context.ts';
	import { theme, type DescriptionCfg, type DescriptionProps } from '../index.ts';
	import type { As, ChildArgOf } from '#lib/types/props.ts';
	import { registerId } from '#lib/utils/registerId.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	const ctx = alertCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: DescriptionProps<TAs> = $props();

	$effect.pre(() => registerId(ctx.descriptionId, id));

	const cls = $derived(
		theme().description({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'alert-description',
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
	childArg={{ props: attrs } as ChildArgOf<DescriptionCfg>}
	{children}
/>
