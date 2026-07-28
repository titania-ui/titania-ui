<script lang="ts">
	import { fieldCtx, formCtx } from '../form-context.ts';
	import type { InputProps } from '../index.ts';

	const ctx = fieldCtx.get();
	const form_ctx = formCtx.get();
	const uid = $props.id();

	let {
		type,
		value = $bindable(undefined),
		//
		id = uid,
		ref = $bindable(null),
		class: className = undefined,
		...props
	}: InputProps = $props();

	const isAuto = ctx.auto.current;

	if (isAuto && !form_ctx)
		throw new Error(
			'Form.Input: a parent Form.Root component is required if Form.Field "auto" is true'
		);

	$effect.pre(() => {
		ctx.inputId.current = id!;
		return () => {
			if (ctx.inputId.current === id) ctx.inputId.current = undefined;
		};
	});

	const mergedProps = $derived({
		'data-slot': 'control',
		'aria-labelledby': ctx.labelId.current,
		'aria-invalid': ctx.errors.current.length > 0 ? 'true' : undefined,
		name: ctx.name.current,
		type,
		id,
		...ctx.attrs.current,
		...props,
		class: ctx.slots.current.input({ className })
	});

	const _form = form_ctx.form.current.form;
</script>

{#if isAuto}
	<input
		bind:this={ref}
		bind:value={$_form[ctx.name.current]}
		{...ctx.constraints.current}
		{...mergedProps}
	/>
{:else}
	<input bind:this={ref} bind:value {...mergedProps} />
{/if}
