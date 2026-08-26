<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { box, boxWith } from 'svelte-toolbelt';
	import { fieldCtx } from '../field-context.ts';
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { formCtx } from '#lib/components/form/form-context.ts';

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

	const ctx = fieldCtx.set({
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
</script>

{#if child}
	{@render child({
		props: attrs
	} as ChildArgOf<RootCfg>)}
{:else if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs}>
		{@render children?.()}
	</Tag>
{/if}
