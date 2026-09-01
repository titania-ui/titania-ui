<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { avatarCtx } from '../avatar-context.js';
	import { theme, type FallbackCfg, type FallbackProps } from '../index.js';

	const ctx = avatarCtx.get();

	let {
		//
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: FallbackProps<TAs> = $props();

	const cls = $derived(
		theme().fallback({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'avatar-fallback',
		...rest,
		class: cls
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<FallbackCfg>}
	{children}
/>
