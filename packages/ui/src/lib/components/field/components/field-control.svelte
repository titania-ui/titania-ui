<script lang="ts">
	import { fieldControlAttrs } from '#lib/utils/fieldControl.js';
	import { type ControlProps, fieldCtx } from '../index.js';

	const field_ctx = fieldCtx.get();
	const uid = $props.id();

	let {
		children,
		//
		id = uid,
		...props
	}: ControlProps = $props();

	const mergedProps = $derived({
		...fieldControlAttrs(field_ctx),
		id,
		...props
	});
</script>

{@render children({ props: mergedProps })}
