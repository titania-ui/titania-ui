<script lang="ts" generics="TAs extends As | undefined = undefined">
	import type { DismissProps, DismissCfg } from '../index.ts';
	import { CloseButton } from '#lib';
	import { alertCtx } from '../alert-context.ts';
	import type { As, ChildArgOf } from '#lib/types/props.js';

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

{#if child}
	{@render child({
		props: attrs
	} as ChildArgOf<DismissCfg>)}
{:else if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs} {children} />
{/if}
