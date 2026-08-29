<script
	lang="ts"
	generics="TAs extends As | undefined = undefined, THref extends string | undefined = undefined"
>
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { usePressableTag } from '#lib/helpers/usePressableTag.svelte.ts';
	import TouchTarget from '#lib/helpers/touch-target.svelte';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	let {
		href,
		pending = false,
		disabled = false,
		//
		as: _Tag,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs, THref> = $props();

	const split = $derived(splitVariants(theme, rest));

	const pressable = usePressableTag({
		as: () => _Tag as As | undefined,
		href: () => href,
		disabled: () => disabled,
		pending: () => pending,
		type: () => split.attrs.type,
		onclick: () => split.attrs.onclick
	});

	const Tag = $derived<As>(pressable.tag);

	const childrenState = $derived({
		pending,
		disabled,
		...pressable.state
	});

	const cls = $derived(
		theme({
			...split.variants,
			disabled: childrenState.disabled,
			pending: childrenState.pending,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'button',
		...split.attrs,
		class: cls,
		...pressable.attrs
	});
</script>

{#snippet body()}
	<TouchTarget>
		{@render children?.(childrenState)}
	</TouchTarget>
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...childrenState } as ChildArgOf<RootCfg>}
	children={body}
/>
