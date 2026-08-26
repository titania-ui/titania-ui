<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { alertCtx } from '../alert-context.ts';
	import { theme, type DescriptionCfg, type DescriptionProps } from '../index.ts';
	import type { As, ChildArgOf } from '#lib/types/props.js';

	const ctx = alertCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: DescriptionProps<TAs> = $props();

	$effect.pre(() => {
		ctx.descriptionId.current = id;
		return () => {
			if (ctx.descriptionId.current === id) ctx.descriptionId.current = undefined;
		};
	});

	const cls = $derived(
		theme().description({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'alert-description',
		...rest,
		class: cls,
		id
	});
</script>

{#if child}
	{@render child({
		props: attrs
	} as ChildArgOf<DescriptionCfg>)}
{:else if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs}>
		{@render children?.()}
	</Tag>
{/if}
