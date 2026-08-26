<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { fieldCtx, theme, type DescriptionProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';

	const field_ctx = fieldCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: DescriptionProps<TAs> = $props();

	$effect.pre(() => {
		field_ctx.descriptionId.current = id;
		return () => {
			if (field_ctx.descriptionId.current === id) field_ctx.descriptionId.current = undefined;
		};
	});

	const cls = $derived(
		theme().description({
			...field_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'description',
		...rest,
		class: cls
	});
</script>

{#if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs}>
		{@render children?.()}
	</Tag>
{/if}
