<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { avatarGroupCtx } from '#lib/components/avatar-group/avatar-group-context.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { avatarCtx } from '../avatar-context.js';
	import { AvatarState } from '../avatar-state.svelte.js';
	import { type RootCfg, type RootProps, theme } from '../index.js';
	import { boxWith } from 'svelte-toolbelt';

	const uid = $props.id();

	const groupCtx = avatarGroupCtx.getOr(undefined);

	let {
		fallbackDelay = 600,
		alt = undefined,
		//
		id = uid,
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	const unregister = groupCtx?.register(uid);
	$effect(() => () => unregister?.());

	const hidden = $derived.by(() => {
		const max = groupCtx?.max.current;
		return max !== undefined && groupCtx!.indexOf(uid) >= max;
	});

	let split = $derived(splitVariants(theme, rest));

	const variants = $derived({ ...groupCtx?.avatarVariants.current, ...split.variants });

	const cls = $derived(theme().root({ ...variants, class: className } as never));

	const state = new AvatarState(() => fallbackDelay);
	state.watchDelay();

	avatarCtx.set({
		variants: boxWith(() => variants),
		alt: boxWith(() => alt),
		state
	});

	const attrs = $derived({
		'data-slot': 'avatar',
		...split.attrs,
		class: cls,
		id
	});
</script>

{#if !hidden}
	<Polymorphic
		tag={Tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs } as ChildArgOf<RootCfg>}
		{children}
	/>
{/if}
