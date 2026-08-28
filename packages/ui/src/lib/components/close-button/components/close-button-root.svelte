<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { Icon } from '#lib';
	import { splitVariants } from '#lib/utils/themeAttrs.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { usePressableTag } from '#lib/helpers/usePressableTag.svelte.ts';
	import TouchTarget from '#lib/helpers/touch-target.svelte';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	let {
		//
		as: Tag = 'button',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	const pressable = usePressableTag();

	const split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'button',
		'aria-label': 'Close',
		role: 'button',
		...split.attrs,
		class: cls,
		...pressable.attachments
	});
</script>

{#snippet childOrElse()}
	{#if children}
		{@render children(pressable.state)}
	{:else}
		<Icon class={theme().placeholder()} />
	{/if}
{/snippet}

{#snippet body()}
	<TouchTarget>
		{@render childOrElse()}
	</TouchTarget>
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...pressable.state } as ChildArgOf<RootCfg>}
	children={body}
/>
