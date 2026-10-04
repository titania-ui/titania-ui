<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import TouchTarget from '#lib/helpers/touch-target.svelte';
	import { usePressableTag } from '#lib/helpers/usePressableTag.svelte.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { chipCtx } from '../chip-context.js';
	import { type RootCfg, type RootProps, theme } from '../index.js';
	import { boxWith } from 'svelte-toolbelt';

	const uid = $props.id();

	let {
		href,
		onclick,
		disabled = false,
		dismissed = $bindable(false),
		ondismiss = undefined,
		//
		id = uid,
		as: _Tag,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const pressable = usePressableTag({
		as: () => _Tag as As | undefined,
		href: () => href,
		disabled: () => disabled,
		type: () => split.attrs.type,
		onclick: () => onclick,
		fallbackTag: () => 'span'
	});

	const childrenState = $derived({
		disabled,
		...pressable.state
	});

	const cls = $derived(
		theme().root({
			...split.variants,
			disabled,
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
		...pressable.attrs,
		class: cls,
		id
	});
</script>

{#snippet body()}
	<TouchTarget>
		{@render children?.(childrenState)}
	</TouchTarget>
{/snippet}

{#if !dismissed}
	<Polymorphic
		tag={pressable.tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs, ...childrenState } as ChildArgOf<RootCfg>}
		children={body}
	/>
{/if}
