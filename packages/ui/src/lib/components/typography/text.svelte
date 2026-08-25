<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootProps } from './text.ts';
	import type { As } from '#lib/types/props.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.ts';

	let {
		//
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			class: className
		} as never)
	);

	const attrs = $derived({ 'data-slot': 'text', ...split.attrs, class: cls });
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
