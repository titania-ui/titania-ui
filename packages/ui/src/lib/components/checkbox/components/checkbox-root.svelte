<script lang="ts">
	import { fieldCtx } from '#lib/components/field/field-context.js';
	import { fieldValue } from '#lib/components/input/field-value.svelte.js';
	import { useHover } from '#lib/helpers/useHover.js';
	import { fieldControlAttrs, fieldInvalid } from '#lib/utils/fieldControl.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { checkboxCtx } from '../checkbox-context.js';
	import { type RootProps, theme } from '../index.js';
	import Control from './checkbox-control.svelte';
	import { boxWith } from 'svelte-toolbelt';

	let field_ctx = fieldCtx.getOr(undefined);

	let {
		checked = $bindable(false),
		indeterminate = $bindable(false),
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

	const variants = $derived({ invalid: __invalid, disabled: __disabled });

	// Inside an auto Field the value lives in the form store, which isn't reactive -> so mirror it locally to keep the visual state in sync
	const val = field_ctx
		? fieldValue<boolean>(
				() => checked,
				(v) => (checked = v)
			)
		: undefined;
	let mirrored = $state(Boolean(val?.isAuto ? val.current : false));
	const isChecked = $derived(val?.isAuto ? mirrored : Boolean(checked));

	// `indeterminate` has no HTML attribute, only a DOM property
	$effect(() => {
		if (ref) (ref as HTMLInputElement).indeterminate = indeterminate;
	});

	function onchange(e: Event & { currentTarget: HTMLInputElement }) {
		const el = e.currentTarget;
		mirrored = el.checked;
		if (val) val.current = el.checked;
		else checked = el.checked;
		// A user toggle always resolves a mixed state
		indeterminate = false;
		(rest.onchange as ((e: Event) => void) | undefined)?.(e);
	}

	checkboxCtx.set({
		variants: boxWith(() => variants),
		checked: boxWith(() => isChecked),
		indeterminate: boxWith(() => indeterminate)
	});

	const cls = $derived(
		theme().root({
			...split.variants,
			...variants,
			class: className
		} as never)
	);

	const attrs = $derived<Record<string, unknown>>({
		...fieldControlAttrs(field_ctx, invalid),
		...split.attrs
	});
</script>

<label
	data-slot="checkbox"
	data-checked={isChecked ? '' : undefined}
	data-indeterminate={indeterminate ? '' : undefined}
	class={cls}
	{@attach useHover({ disabled: __disabled })}
>
	<input
		bind:this={ref}
		{...attrs}
		type="checkbox"
		class="tacheckbox__input"
		checked={isChecked}
		{onchange}
	/>
	{#if children}
		{@render children({ checked: isChecked, indeterminate })}
	{:else}
		<Control />
	{/if}
</label>
