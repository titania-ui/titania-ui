<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { fieldCtx, theme, type DescriptionCfg, type DescriptionProps } from '../index.ts';
	import type { As, ChildArgOf } from '#lib/types/props.ts';
	import { registerId } from '#lib/utils/registerId.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	const field_ctx = fieldCtx.get();
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

	$effect.pre(() => registerId(field_ctx.descriptionId, id));

	const cls = $derived(
		theme().description({
			...field_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'description',
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
