<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { Icon } from '#lib';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type IconCfg, type IconProps, theme } from '../index.js';
	import { switchCtx } from '../switch-context.js';

	const ctx = switchCtx.get();

	let {
		//
		as: _Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: IconProps<TAs> = $props();

	const state = $derived({ checked: ctx.checked.current });

	const Tag = $derived(_Tag ?? Icon);

	const cls = $derived(
		theme().icon({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'icon',
		'data-checked': state.checked ? '' : undefined,
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
	childArg={{ props: attrs, ...state } as ChildArgOf<IconCfg>}
	children={children ? body : undefined}
/>
