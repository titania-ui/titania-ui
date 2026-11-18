<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { CloseButton } from '#lib';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { ui_chip_remove } from '#lib/paraglide/messages.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { chipCtx } from '../chip-context.js';
	import type { DismissCfg, DismissProps } from '../index.js';

	const ctx = chipCtx.get();

	let {
		as: Tag = CloseButton,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: DismissProps<TAs> = $props();

	const attrs = $derived({
		'aria-controls': ctx.id.current,
		'aria-label': ui_chip_remove(),
		...rest,
		onclick: (e: MouseEvent) => {
			if (typeof rest.onclick === 'function') rest.onclick?.(e);
			if (!e.defaultPrevented) ctx.dismissed.current = true;
		}
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<DismissCfg>}
	{children}
/>
