<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import ToggleInput from '#lib/helpers/toggle-input.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type ControlCfg, type ControlProps, theme } from '../index.js';
	import { switchCtx } from '../switch-context.js';
	import Thumb from './switch-thumb.svelte';

	const ctx = switchCtx.get();

	let {
		//
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: ControlProps<TAs> = $props();

	const state = $derived({ checked: ctx.checked.current });

	const cls = $derived(
		theme().control({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'switch-control',
		'data-checked': state.checked ? '' : undefined,
		...rest,
		class: cls
	});
</script>

{#snippet input()}
	<ToggleInput type="checkbox" role="switch" class="taswitch__input" />
{/snippet}

{#snippet body()}
	{@render input()}
	{#if children}
		{@render children(state)}
	{:else}
		<Thumb />
	{/if}
{/snippet}

<!-- `child` replaces the body, so the native input has to sit beside it -->
{#if child}
	{@render input()}
{/if}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...state } as ChildArgOf<ControlCfg>}
	children={body}
/>
