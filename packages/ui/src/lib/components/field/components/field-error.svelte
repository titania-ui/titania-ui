<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { registerId } from '#lib/utils/registerId.js';
	import { type ErrorCfg, type ErrorProps, fieldCtx, theme } from '../index.js';

	const field_ctx = fieldCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		child,
		...rest
	}: ErrorProps<TAs> = $props();

	const cls = $derived(
		theme().error({
			...field_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'error',
		...rest,
		class: cls,
		id
	});

	const hasError = $derived(field_ctx.errors.current.length > 0);

	$effect.pre(() => {
		if (hasError) return registerId(field_ctx.errorId, id);
	});
</script>

{#if hasError}
	<Polymorphic
		tag={Tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs, errors: field_ctx.errors.current } as ChildArgOf<ErrorCfg>}
	>
		{field_ctx.errors.current[0]}
	</Polymorphic>
{/if}
