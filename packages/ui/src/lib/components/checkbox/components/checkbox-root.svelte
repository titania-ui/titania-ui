<script lang="ts">
	import { useHover } from '#lib/helpers/useHover.js';
	import { useToggleInput } from '#lib/helpers/useToggleInput.svelte.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { checkboxCtx } from '../checkbox-context.js';
	import { type RootProps, theme } from '../index.js';
	import Control from './checkbox-control.svelte';
	import { boxWith } from 'svelte-toolbelt';

	const uid = $props.id();

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

	let split = $derived(splitVariants(theme, rest));

	const toggle = useToggleInput({
		uid,
		checked: () => checked,
		setChecked: (v) => (checked = v),
		invalid: () => invalid,
		disabled: () => disabled,
		ref: () => ref as HTMLInputElement | null,
		setRef: (v) => (ref = v),
		attrs: () => split.attrs,
		// A user toggle always resolves a mixed state
		onToggle: () => (indeterminate = false)
	});

	const variants = $derived({ invalid: toggle.invalid, disabled: toggle.disabled });

	// `indeterminate` has no HTML attribute, only a DOM property
	$effect(() => {
		if (ref) (ref as HTMLInputElement).indeterminate = indeterminate;
	});

	checkboxCtx.set({
		variants: boxWith(() => variants),
		checked: boxWith(() => toggle.checked),
		indeterminate: boxWith(() => indeterminate)
	});

	const cls = $derived(
		theme().root({
			...split.variants,
			...variants,
			class: className
		} as never)
	);
</script>

<div
	data-slot="checkbox"
	data-checked={toggle.checked ? '' : undefined}
	data-indeterminate={indeterminate ? '' : undefined}
	data-disabled={toggle.disabled ? '' : undefined}
	class={cls}
	{@attach useHover({ disabled: toggle.disabled })}
>
	{#if children}
		{@render children({ checked: toggle.checked, indeterminate })}
	{:else}
		<Control />
	{/if}
</div>
