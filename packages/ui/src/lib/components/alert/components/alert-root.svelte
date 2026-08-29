<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { box, boxWith } from 'svelte-toolbelt';
	import { alertCtx } from '../alert-context.ts';
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

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
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	const ctx = alertCtx.set({
		id: boxWith(() => id),
		variants: boxWith(() => split.variants),
		titleId: box<string | undefined>(undefined),
		descriptionId: box<string | undefined>(undefined),
		dismissed: boxWith(
			() => dismissed,
			(v) => {
				dismissed = v;
				if (v) ondismiss?.();
			}
		)
	});

	const attrs = $derived({
		'data-slot': 'alert',
		role:
			split.variants.status === 'warning' || split.variants.status === 'danger'
				? 'alert'
				: 'status',
		'aria-atomic': 'true',
		'aria-labelledby': ctx.titleId.current,
		'aria-describedby': ctx.descriptionId.current,
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
