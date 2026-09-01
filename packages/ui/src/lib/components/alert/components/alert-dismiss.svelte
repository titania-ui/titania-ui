<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { CloseButton } from '#lib';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { alertCtx } from '../alert-context.js';
	import type { DismissCfg, DismissProps } from '../index.js';

	const ctx = alertCtx.get();

	let {
		as: Tag = CloseButton,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: DismissProps<TAs> = $props();

	const attrs = $derived({
		'aria-controls': ctx.id.current,
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
