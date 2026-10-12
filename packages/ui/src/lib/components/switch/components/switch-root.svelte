<script lang="ts">
	import { useHover } from '#lib/helpers/useHover.js';
	import { useToggleInput } from '#lib/helpers/useToggleInput.svelte.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { type RootProps, theme } from '../index.js';
	import { switchCtx } from '../switch-context.js';
	import Control from './switch-control.svelte';
	import { boxWith } from 'svelte-toolbelt';

	const uid = $props.id();

	let {
		checked = $bindable(false),
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
		attrs: () => split.attrs
	});

	const variants = $derived({ invalid: toggle.invalid, disabled: toggle.disabled });

	switchCtx.set({
		variants: boxWith(() => variants),
		checked: boxWith(() => toggle.checked)
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
	data-slot="switch"
	data-checked={toggle.checked ? '' : undefined}
	data-disabled={toggle.disabled ? '' : undefined}
	class={cls}
	{@attach useHover({ disabled: toggle.disabled })}
>
	{#if children}
		{@render children({ checked: toggle.checked })}
	{:else}
		<Control />
	{/if}
</div>
