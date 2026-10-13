<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { useToggleContent } from '#lib/helpers/useToggleInput.svelte.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type ContentCfg, type ContentProps, theme } from '../index.js';
	import { switchCtx } from '../switch-context.js';

	const ctx = switchCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		onclick: userOnclick = undefined,
		...rest
	}: ContentProps<TAs> = $props();

	const forward = useToggleContent(() => id);

	const state = $derived({ checked: ctx.checked.current });

	const cls = $derived(
		theme().content({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'switch-content',
		...rest,
		onclick: (e: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => {
			(userOnclick as ((e: MouseEvent) => void) | undefined)?.(e);
			forward(e);
		},
		class: cls,
		id
	});
</script>

{#snippet body()}
	{@render children?.(state)}
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...state } as ChildArgOf<ContentCfg>}
	children={body}
/>
