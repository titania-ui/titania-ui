<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { registerId } from '#lib/utils/registerId.js';
	import { type DescriptionCfg, type DescriptionProps, fieldCtx, theme } from '../index.js';

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
