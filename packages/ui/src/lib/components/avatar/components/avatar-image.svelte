<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { avatarCtx } from '../avatar-context.js';
	import { type ImageCfg, type ImageProps, theme } from '../index.js';

	const ctx = avatarCtx.get();

	let {
		//
		as: Tag = 'img',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: ImageProps<TAs> = $props();

	const cls = $derived(
		theme().image({
			...ctx.variants.current,
			class: className
		} as never)
	);

	$effect(() => ctx.state.registerImage());

	$effect(() =>
		ctx.state.load(rest.src as string | undefined, {
			crossOrigin: rest.crossorigin as never,
			referrerPolicy: rest.referrerpolicy as never
		})
	);

	const attrs = $derived({
		'data-slot': 'avatar-image',
		...rest,
		class: cls
	});
</script>

{#if ctx.state.status === 'loaded'}
	<Polymorphic
		tag={Tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs } as ChildArgOf<ImageCfg>}
		{children}
	/>
{/if}
