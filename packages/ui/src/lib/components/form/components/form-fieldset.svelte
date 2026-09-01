<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type FieldsetCfg, type FieldsetProps, fieldsetCtx, formCtx, theme } from '../index.js';
	import { box } from 'svelte-toolbelt';

	const form_ctx = formCtx.get();

	let {
		//
		as: Tag = 'fieldset',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: FieldsetProps<TAs> = $props();

	const ctx = fieldsetCtx.set({
		legendId: box<string | undefined>(undefined)
	});

	const cls = $derived(
		theme().fieldset({
			...form_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'aria-labelledby': ctx.legendId.current,
		...rest,
		class: cls
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<FieldsetCfg>}
	{children}
/>
