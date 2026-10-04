<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { chipCtx } from '../chip-context.js';
	import { type RootCfg, type RootProps, theme } from '../index.js';
	import { boxWith } from 'svelte-toolbelt';

	const uid = $props.id();

	let {
		dismissed = $bindable(false),
		ondismiss = undefined,
		//
		id = uid,
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	const ctx = chipCtx.set({
		id: boxWith(() => id),
		labelId: boxWith(() => undefined),
		variants: boxWith(() => split.variants),
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
		'aria-describedby': ctx.labelId.current,
		...split.attrs,
		class: cls,
		id
	});
</script>

{#if !dismissed}
	<Polymorphic
		tag={Tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs } as ChildArgOf<RootCfg>}
		{children}
	/>
{/if}
