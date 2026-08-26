<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { fieldCtx, theme, type DescriptionProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';

	const field_ctx = fieldCtx.get();

	let {
		//
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: DescriptionProps<TAs> = $props();

	const cls = $derived(
		theme().error({
			...field_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'error',
		...rest,
		class: cls
	});

	const hasError = $derived(field_ctx.errors.current.length > 0);
</script>

{#if hasError}
	{#if typeof Tag === 'string'}
		<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
			{field_ctx.errors.current[0]}
		</svelte:element>
	{:else}
		<Tag bind:ref {...attrs}>
			{field_ctx.errors.current[0]}
		</Tag>
	{/if}
{/if}
