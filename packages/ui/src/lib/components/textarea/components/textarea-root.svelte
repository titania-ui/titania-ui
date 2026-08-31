<script lang="ts">
	import { theme, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/splitVariants.ts';
	import { fieldControlAttrs, fieldInvalid } from '#lib/utils/fieldControl.ts';
	import { fieldCtx } from '#lib/components/field/field-context.ts';
	import { fieldValue } from '#lib/components/input/field-value.svelte.ts';
	import { createAttachmentKey } from 'svelte/attachments';
	import { useHover } from '#lib/helpers/useHover.ts';

	let field_ctx = fieldCtx.getOr(undefined);

	let {
		value = $bindable(null),
		invalid = undefined,
		disabled = undefined,
		//
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: RootProps = $props();

	const __invalid = $derived(fieldInvalid(field_ctx, invalid));
	const __disabled = $derived(field_ctx ? field_ctx.disabled.current : disabled);

	let split = $derived(
		splitVariants(theme, { ...rest, invalid: __invalid, disabled: __disabled }, ['disabled'])
	);

	const cls = $derived(
		theme().root({
			...split.variants,
			invalid: __invalid,
			disabled: __disabled,
			class: className
		} as never)
	);

	const attrs = $derived({
		...fieldControlAttrs(field_ctx, invalid),
		[createAttachmentKey()]: useHover({ isDisabled: __disabled }),
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
		invalid: __invalid,
		disabled: __disabled
	})}
>
	<textarea bind:this={ref} bind:value={() => val.current, (v) => (val.current = v)} {...attrs}
	></textarea>
</span>
