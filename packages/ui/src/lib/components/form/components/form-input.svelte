<script lang="ts">
	import { fieldCtx, formCtx } from '../form-context.ts';
	import type { InputProps } from '../index.ts';

	const ctx = fieldCtx.get();
	const form_ctx = formCtx.get();
	const uid = $props.id();

	let {
		type,
		//
		id = uid,
		ref = $bindable(null),
		class: className = undefined,
		...props
	}: InputProps = $props();

	const _form = form_ctx.form.current.form;

	$effect.pre(() => {
		ctx.inputId.current = id!;
		return () => {
			if (ctx.inputId.current === id) ctx.inputId.current = undefined;
		};
	});

	const mergedProps = $derived({
		'data-slot': 'control',
		'aria-labelledby': ctx.labelId.current,
		'aria-invalid': ctx.errors.current ? 'true' : undefined,
		name: ctx.name.current,
		type,
		...ctx.constraints.current,
		...ctx.attrs.current,
		...props,
		id,
		class: ctx.slots.current.input({ className })
	});
</script>

<input bind:this={ref} bind:value={$_form[ctx.name.current]} {...mergedProps} />
