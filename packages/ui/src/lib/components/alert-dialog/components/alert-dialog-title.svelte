<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { alertDialogCtx } from '../alert-dialog-context.js';
	import { type TitleCfg, type TitleProps, theme } from '../index.js';
	import { AlertDialog as Primitive } from 'bits-ui';
	import { mergeProps } from 'svelte-toolbelt';

	const ctx = alertDialogCtx.get();

	let {
		//
		as: Tag = 'h2',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child: userChild,
		...rest
	}: TitleProps<TAs> = $props();

	// A real heading element needs no role="heading" from bits-ui
	const isHeading = $derived(typeof Tag === 'string' && /^h[1-6]$/.test(Tag));

	function attrsFor(props: Record<string, unknown>) {
		const { role, 'aria-level': level, ...own } = props;
		return {
			'data-slot': 'alert-dialog-title',
			...mergeProps(rest, own),
			...(isHeading ? {} : { role, 'aria-level': level }),
			class: theme().title({ class: className } as never)
		};
	}
</script>

{#snippet body()}
	{#if ctx.statusLabel.current}
		<span class="sr-only">{ctx.statusLabel.current}: </span>
	{/if}
	{@render children?.()}
{/snippet}

<!-- bits-ui links the title to the dialog via aria-labelledby -->
<Primitive.Title>
	{#snippet child({ props })}
		{@const attrs = attrsFor(props)}
		<Polymorphic
			tag={Tag}
			{attrs}
			bind:ref
			child={userChild}
			childArg={{ props: attrs } as ChildArgOf<TitleCfg>}
			children={body}
		/>
	{/snippet}
</Primitive.Title>
