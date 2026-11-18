<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Icon from '#lib/components/typography/icon.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { alertDialogCtx } from '../alert-dialog-context.js';
	import { type IndicatorCfg, type IndicatorProps, theme } from '../index.js';
	import { cx } from 'tailwind-variants/lite';

	const ctx = alertDialogCtx.get();

	let {
		//
		as: _Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: IndicatorProps<TAs> = $props();

	const Tag = $derived(_Tag ?? Icon);

	const cls = $derived(
		cx(
			theme().indicator({ status: ctx.status.current, class: className } as never),
			!_Tag && !(rest as { icon?: string }).icon && theme().indicator_placeholder()
		)
	);

	// Decorative: the status word is read as part of the title instead
	const attrs = $derived({
		'data-slot': 'icon',
		'aria-hidden': 'true',
		...rest,
		class: cls
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<IndicatorCfg>}
	{children}
/>
