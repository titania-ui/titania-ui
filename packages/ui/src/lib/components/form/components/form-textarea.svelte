<script lang="ts">
	import { fieldValue } from '../field-value.svelte.ts';
	import { fieldCtx } from '../form-context.ts';
	import type { InputProps } from '../index.ts';

	const ctx = fieldCtx.get();
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

	const val = fieldValue(
		() => value,
		(v) => (value = v)
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
		rows: props.rows || 4,
		name: ctx.name.current,
		type,
		id,
		...(val.isAuto ? ctx.constraints.current : {}),
		...ctx.attrs.current,
		...props,
		class: ctx.slots.current.textarea({ className })
	});
</script>

<textarea bind:this={ref} bind:value={() => val.current, (v) => (val.current = v)} {...mergedProps}
></textarea>
