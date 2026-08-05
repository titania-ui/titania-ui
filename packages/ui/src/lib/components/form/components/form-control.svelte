<script lang="ts">
	import { box, boxWith } from 'svelte-toolbelt';
	import { controlCtx, fieldCtx } from '../form-context.ts';
	import type { ControlProps } from '../index.ts';

	const field_ctx = fieldCtx.get();
	const uid = $props.id();

	let {
		children,
		//
		id = uid,
		...props
	}: ControlProps = $props();

	const ctx = controlCtx.set({
		inputId: boxWith(() => id),
		labelId: box<string | undefined>(undefined),
		props: boxWith(() => mergedProps)
	});

	const mergedProps = $derived({
		'data-slot': 'control',
		'aria-labelledby': ctx.labelId.current,
		'aria-invalid': field_ctx.errors.current.length > 0 ? 'true' : undefined,
		disabled: field_ctx.disabled.current || undefined,
		name: field_ctx.name.current,
		id,
		...field_ctx.constraints.current,
		...props
	});
</script>

{@render children({ props: mergedProps })}
