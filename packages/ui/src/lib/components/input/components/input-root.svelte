<script lang="ts">
	import { fieldCtx } from '#lib/components/field/field-context.js';
	import { useHover } from '#lib/helpers/useHover.js';
	import { fieldControlAttrs, fieldInvalid } from '#lib/utils/fieldControl.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { fieldValue } from '../field-value.svelte.js';
	import { type RootProps, theme } from '../index.js';
	import { createAttachmentKey } from 'svelte/attachments';

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

	const attrs = $derived<Record<string, unknown>>({
		...fieldControlAttrs(field_ctx, invalid),
		...split.attrs,
		[createAttachmentKey()]: useHover({ isDisabled: __disabled }),
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
	<input bind:this={ref} bind:value={() => val.current, (v) => (val.current = v)} {...attrs} />
</span>
