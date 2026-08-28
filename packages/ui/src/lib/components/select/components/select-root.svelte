<script lang="ts">
	import { theme, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.ts';
	import { fieldControlAttrs, fieldInvalid } from '#lib/utils/fieldControl.ts';
	import { fieldCtx } from '#lib/components/field/field-context.ts';
	import { fieldValue } from '#lib/components/input/field-value.svelte.ts';

	let field_ctx = fieldCtx.getOr(undefined);

	let {
		value = $bindable(null),
		invalid = false,
		multiple = false,
		//
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: RootProps = $props();

	const __invalid = $derived(fieldInvalid(field_ctx, invalid));

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme().root({
			...split.variants,
			invalid: __invalid,
			multiple,
			class: className
		} as never)
	);

	const attrs = $derived<Record<string, unknown>>({
		...fieldControlAttrs(field_ctx, invalid),
		multiple,
		...split.attrs,
		class: cls
	});

	let val = fieldValue(
		() => value,
		(v) => (value = v)
	);
</script>

<span
	data-slot="control"
	class={theme().wrapper({
		...split.variants,
		invalid: __invalid
	})}
>
	<select bind:this={ref} bind:value={() => val.current, (v) => (val.current = v)} {...attrs}>
		{@render children?.()}
	</select>
	{#if !multiple}
		<span class={theme().icon__wrapper()}>
			<span class={theme().icon()}></span>
		</span>
	{/if}
</span>
