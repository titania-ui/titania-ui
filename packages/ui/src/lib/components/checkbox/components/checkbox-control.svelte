<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { checkboxCtx } from '../checkbox-context.js';
	import { type ControlCfg, type ControlProps, theme } from '../index.js';
	import Indicator from './checkbox-indicator.svelte';

	const ctx = checkboxCtx.get();

	let {
		//
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: ControlProps<TAs> = $props();

	const state = $derived({
		checked: ctx.checked.current,
		indeterminate: ctx.indeterminate.current
	});

	const cls = $derived(
		theme().control({
			...ctx.variants.current,
			class: className
		} as never)
	);

	// Decorative: the native input carries the role, name and state.
	const attrs = $derived({
		'data-slot': 'checkbox-control',
		'data-checked': state.checked ? '' : undefined,
		'data-indeterminate': state.indeterminate ? '' : undefined,
		'aria-hidden': 'true',
		...rest,
		class: cls
	});
</script>

{#snippet body()}
	{#if children}
		{@render children(state)}
	{:else}
		<Indicator />
	{/if}
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...state } as ChildArgOf<ControlCfg>}
	children={body}
/>
