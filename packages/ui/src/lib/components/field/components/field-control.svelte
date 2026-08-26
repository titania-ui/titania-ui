<script lang="ts">
	import { fieldCtx, type ControlProps } from '../index.ts';

	const field_ctx = fieldCtx.get();
	const uid = $props.id();

	let {
		children,
		//
		id = uid,
		...props
	}: ControlProps = $props();

	const mergedProps = $derived({
		'data-slot': 'control',
		'aria-labelledby': field_ctx.labelId.current,
		'aria-describedby': field_ctx.descriptionId.current,
		'aria-invalid': field_ctx.errors.current.length > 0 ? 'true' : undefined,
		disabled: field_ctx.disabled.current || undefined,
		name: field_ctx.name.current,
		id,
		...field_ctx.constraints.current,
		...props
	});
</script>

{@render children({ props: mergedProps })}
