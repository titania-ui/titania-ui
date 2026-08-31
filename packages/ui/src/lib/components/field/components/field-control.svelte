<script lang="ts">
	import { fieldCtx, type ControlProps } from '../index.js';
	import { fieldControlAttrs } from '#lib/utils/fieldControl.js';

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
