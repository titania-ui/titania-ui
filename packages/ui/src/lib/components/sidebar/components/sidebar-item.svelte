<script
	lang="ts"
	generics="TAs extends As | undefined = undefined, THref extends string | undefined = undefined"
>
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { usePressableTag } from '#lib/helpers/usePressableTag.svelte.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type ItemCfg, type ItemProps, sidebarCtx, theme } from '../index.js';

	const ctx = sidebarCtx.get();

	let {
		current = false,
		disabled = false,
		href = undefined,
		//
		as: _Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: ItemProps<TAs, THref> = $props();

	const pressable = usePressableTag({
		as: () => _Tag as As | undefined,
		href: () => href,
		disabled: () => disabled,
		type: () => rest.type,
		onclick: () => rest.onclick
	});

	const Tag = $derived<As>(pressable.tag);

	const childrenState = $derived({
		disabled,
		current,
		...pressable.state
	});

	const cls = $derived(
		theme().item({
			disabled,
			current,
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'button',
		...rest,
		class: cls,
		...pressable.attrs
	});
</script>

{#snippet body()}
	{@render children?.(childrenState)}
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...childrenState } as ChildArgOf<ItemCfg>}
	children={body}
/>
