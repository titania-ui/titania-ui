<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootCfg, type RootProps } from './link.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { useHover } from '#lib/helpers/useHover.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { createAttachmentKey } from 'svelte/attachments';

	let {
		disabled = false,
		//
		as: Tag = 'a',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			disabled,
			...split.variants,
			class: className
		} as never)
	);

	const HOVER = createAttachmentKey();

	const attrs = $derived({
		'aria-disabled': disabled ? 'true' : undefined,
		...split.attrs,
		class: cls,
		[HOVER]: useHover({ isDisabled: disabled })
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<RootCfg>}
	{children}
/>
