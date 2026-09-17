<script
	lang="ts"
	generics="TAs extends As | undefined = undefined, THref extends string | undefined = undefined"
>
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import TouchTarget from '#lib/helpers/touch-target.svelte';
	import { usePressableTag } from '#lib/helpers/usePressableTag.svelte.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { type RootCfg, type RootProps, theme } from '../index.js';

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
			disabled,
			pending,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'button',
		...split.attrs,
		...pressable.attrs,
		class: cls
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
