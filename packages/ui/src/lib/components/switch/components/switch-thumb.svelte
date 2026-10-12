<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type ThumbCfg, type ThumbProps, theme } from '../index.js';
	import { switchCtx } from '../switch-context.js';

	const ctx = switchCtx.get();

	let {
		//
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: ThumbProps<TAs> = $props();

	const state = $derived({ checked: ctx.checked.current });

	const cls = $derived(
		theme().thumb({
			...ctx.variants.current,
			class: className
		} as never)
	);

	// Decorative: the native input carries the role, name and state.
	const attrs = $derived({
		'data-slot': 'switch-thumb',
		'data-checked': state.checked ? '' : undefined,
		'aria-hidden': 'true',
		...rest,
		class: cls
	});
</script>

{#snippet body()}
	{@render children?.(state)}
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...state } as ChildArgOf<ThumbCfg>}
	children={body}
/>
