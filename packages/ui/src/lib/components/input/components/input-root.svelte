<script lang="ts">
	import { theme, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/splitVariants.ts';
	import { fieldControlAttrs, fieldInvalid } from '#lib/utils/fieldControl.ts';
	import { fieldCtx } from '#lib/components/field/field-context.ts';
	import { fieldValue } from '../field-value.svelte.ts';

	let field_ctx = fieldCtx.getOr(undefined);

	let {
		value = $bindable(null),
		invalid = undefined,
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
			class: className
		} as never)
	);

	const attrs = $derived<Record<string, unknown>>({
		...fieldControlAttrs(field_ctx, invalid),
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
	<input bind:this={ref} bind:value={() => val.current, (v) => (val.current = v)} {...attrs} />
</span>
