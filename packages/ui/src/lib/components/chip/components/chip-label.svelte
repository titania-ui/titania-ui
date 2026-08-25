<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type LabelProps } from '../index.ts';
	import { chipCtx } from '../chip-context.ts';
	import type { As } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/themeAttrs.js';

	const ctx = chipCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: LabelProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme().label({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		...rest,
		class: cls,
		id
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
