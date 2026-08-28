<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { sidebarCtx, theme, type ItemCfg, type ItemProps } from '../index.ts';
	import type { As, ChildArgOf } from '#lib/types/props.ts';
	import { usePressableTag } from '#lib/helpers/usePressableTag.svelte.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

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
		...rest
	}: ItemProps<TAs> = $props();

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

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{children}
	childArg={{ props: attrs, ...childrenState } as ChildArgOf<ItemCfg>}
/>
