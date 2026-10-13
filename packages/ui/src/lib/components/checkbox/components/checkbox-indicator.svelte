<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { Icon } from '#lib';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { checkboxCtx } from '../checkbox-context.js';
	import { type IndicatorCfg, type IndicatorProps, theme } from '../index.js';

	const ctx = checkboxCtx.get();

	let {
		//
		as: _Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: IndicatorProps<TAs> = $props();

	const state = $derived({
		checked: ctx.checked.current,
		indeterminate: ctx.indeterminate.current
	});

	const Tag = $derived(_Tag ?? Icon);

	const cls = $derived(
		theme().indicator({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'icon',
		'data-checked': state.checked ? '' : undefined,
		'data-indeterminate': state.indeterminate ? '' : undefined,
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
	childArg={{ props: attrs, ...state } as ChildArgOf<IndicatorCfg>}
	children={children ? body : undefined}
/>
