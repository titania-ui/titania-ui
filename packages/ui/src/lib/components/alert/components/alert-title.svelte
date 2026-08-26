<script lang="ts" generics="TAs extends As | undefined = undefined">
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { alertCtx } from '../alert-context.ts';
	import { theme, type TitleCfg, type TitleProps } from '../index.ts';

	const ctx = alertCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'h3',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: TitleProps<TAs> = $props();

	$effect.pre(() => {
		ctx.titleId.current = id;
		return () => {
			if (ctx.titleId.current === id) ctx.titleId.current = undefined;
		};
	});

	const cls = $derived(
		theme().title({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'alert-title',
		...rest,
		class: cls,
		id
	});
</script>

{#if child}
	{@render child({
		props: attrs
	} as ChildArgOf<TitleCfg>)}
{:else if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs}>
		{@render children?.()}
	</Tag>
{/if}
