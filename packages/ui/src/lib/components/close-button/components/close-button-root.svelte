<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { Icon } from '#lib';
	import { splitVariants } from '#lib/utils/themeAttrs.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { useActivePress } from '#lib/helpers/useActivePress.js';
	import { useFocusRing } from '#lib/helpers/useFocusRing.js';
	import { useHover } from '#lib/helpers/useHover.js';
	import TouchTarget from '#lib/helpers/touch-target.svelte';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { createAttachmentKey } from 'svelte/attachments';

	let {
		//
		as: Tag = 'button',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	const split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	const HOVER = createAttachmentKey();
	const FOCUS = createAttachmentKey();
	const PRESS = createAttachmentKey();

	const attrs = $derived({
		'data-slot': 'button',
		'aria-label': 'Close',
		role: 'button',
		...split.attrs,
		class: cls,
		[HOVER]: useHover(),
		[FOCUS]: useFocusRing(),
		[PRESS]: useActivePress()
	});
</script>

{#snippet childOrElse()}
	{#if children}
		{@render children()}
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
	childArg={{ props: attrs } as ChildArgOf<RootCfg>}
	children={body}
/>
