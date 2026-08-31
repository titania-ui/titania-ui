<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootCfg, type RootProps } from '../index.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { registerId } from '#lib/utils/registerId.js';
	import { fieldCtx } from '#lib/components/field/field-context.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	let field_ctx = fieldCtx.getOr(undefined);
	const uid = $props.id();

	let {
		required = undefined,
		invalid = undefined,
		//
		id = uid,
		as: Tag = 'label',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	$effect.pre(() => {
		if (field_ctx) return registerId(field_ctx.labelId, id);
	});

	const __required = $derived(field_ctx ? field_ctx.required.current : required);
	const __invalid = $derived(field_ctx ? field_ctx.errors.current.length > 0 : invalid);

	const childrenState = $derived({ required: Boolean(__required), invalid: Boolean(__invalid) });

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			required: __required,
			invalid: __invalid,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'label',
		for: field_ctx ? field_ctx.name.current : undefined,
		...split.attrs,
		class: cls,
		id
	});
</script>

{#snippet body()}
	{@render children?.(childrenState)}
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, ...childrenState } as ChildArgOf<RootCfg>}
	children={body}
/>
