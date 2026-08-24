<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { chipCtx } from '../chip-context.ts';
	import { boxWith } from 'svelte-toolbelt';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/themeAttrs.js';

	const uid = $props.id();

	let {
		dismissed = $bindable(false),
		ondismiss = undefined,
		//
		id = uid,
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			class: className
		} as never)
	);

	chipCtx.set({
		id: boxWith(() => id),
		dismissed: boxWith(
			() => dismissed,
			(v) => {
				dismissed = v;
				if (v) ondismiss?.();
			}
		)
	});

	const attrs = $derived({
		'data-slot': 'chip',
		...split.attrs,
		class: cls,
		id
	});
</script>

{#if !dismissed}
	{#if child}
		{@render child({
			props: attrs
		} as ChildArgOf<RootCfg>)}
	{:else if typeof Tag === 'string'}
		<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
			{@render children?.()}
		</svelte:element>
	{:else}
		<Tag bind:ref {...attrs}>
			{@render children?.()}
		</Tag>
	{/if}
{/if}
