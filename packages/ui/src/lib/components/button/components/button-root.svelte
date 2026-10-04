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

	// Split the rest props into theme variants and the rest of the props.
	const split = $derived(splitVariants(theme, rest));

	// Helper to determine the correct tag to use and automatically apply helpers
	const pressable = usePressableTag({
		as: () => _Tag as As | undefined,
		href: () => href,
		disabled: () => disabled,
		pending: () => pending,
		type: () => split.attrs.type,
		onclick: () => split.attrs.onclick
	});

	// State to pass to the children function
	const childrenState = $derived({
		pending,
		disabled,
		...pressable.state
	});

	// Apply the theme
	const cls = $derived(
		theme({
			...split.variants,
			disabled,
			pending,
			class: className
		} as never)
	);

	// Merge the attributes
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
	tag={pressable.tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...childrenState } as ChildArgOf<RootCfg>}
	children={body}
/>
