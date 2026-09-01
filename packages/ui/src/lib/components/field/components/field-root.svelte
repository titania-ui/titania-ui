<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { formCtx } from '#lib/components/form/form-context.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { fieldCtx } from '../field-context.js';
	import { type RootCfg, type RootProps, theme } from '../index.js';
	import { box, boxWith } from 'svelte-toolbelt';

	const form_ctx = formCtx.getOr(undefined);

	let {
		name = undefined,
		auto = false,
		disabled = false,
		required = false,
		errors = [],
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const __errors = $derived<string[]>(
		!auto || !form_ctx || !name ? errors : ((form_ctx.errors.current?.[name] ?? []) as string[])
	);
	const __constraints = $derived<Record<string, unknown>>(
		!auto || !form_ctx || !name
			? {}
			: (form_ctx.constraints.current?.[name] as Record<string, unknown>)
	);
	const __required = $derived<boolean>(
		!auto || !form_ctx || !name ? required : ((__constraints?.required ?? false) as boolean)
	);

	fieldCtx.set({
		name: boxWith(() => name),
		variants: boxWith(() => split.variants),

		auto: boxWith(() => auto),
		required: boxWith(() => __required),
		disabled: boxWith(() => disabled),
		errors: boxWith(() => __errors),
		constraints: boxWith(() => __constraints),

		descriptionId: box<string | undefined>(undefined),
		labelId: box<string | undefined>(undefined)
	});

	const cls = $derived(
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'field',
		...split.attrs,
		class: cls
	});

	const childrenState = $derived({
		errors: __errors,
		required: __required,
		disabled
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
