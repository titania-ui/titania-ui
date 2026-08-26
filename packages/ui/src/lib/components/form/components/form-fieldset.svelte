<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { fieldsetCtx, formCtx, theme, type FieldsetProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';
	import { box } from 'svelte-toolbelt';

	const form_ctx = formCtx.get();

	let {
		//
		as: Tag = 'fieldset',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: FieldsetProps<TAs> = $props();

	const ctx = fieldsetCtx.set({
		legendId: box<string | undefined>(undefined)
	});

	const cls = $derived(
		theme().fieldset({
			...form_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'aria-labelledby': ctx.legendId.current,
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
