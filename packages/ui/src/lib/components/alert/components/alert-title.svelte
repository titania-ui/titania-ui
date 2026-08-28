<script lang="ts" generics="TAs extends As | undefined = undefined">
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { registerId } from '#lib/utils/registerId.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { alertCtx } from '../alert-context.ts';
	import { theme, type TitleCfg, type TitleProps } from '../index.ts';

	const ctx = alertCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'h3',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: TitleProps<TAs> = $props();

	$effect.pre(() => registerId(ctx.titleId, id));

	const cls = $derived(
		theme().title({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'alert-title',
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
	childArg={{ props: attrs } as ChildArgOf<TitleCfg>}
	{children}
/>
