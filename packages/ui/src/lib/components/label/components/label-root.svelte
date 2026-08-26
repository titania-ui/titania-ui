<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.ts';
	import { fieldCtx } from '#lib/components/field/field-context.ts';

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
		...rest
	}: RootProps<TAs> = $props();

	$effect.pre(() => {
		if (field_ctx) {
			field_ctx.labelId.current = id;
			return () => {
				if (field_ctx.labelId.current === id) field_ctx.labelId.current = undefined;
			};
		}
	});

	const __required = $derived(field_ctx ? field_ctx.required.current : required);
	const __invalid = $derived(field_ctx ? field_ctx.errors.current.length > 0 : invalid);

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

{#if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs}>
		{@render children?.()}
	</Tag>
{/if}
