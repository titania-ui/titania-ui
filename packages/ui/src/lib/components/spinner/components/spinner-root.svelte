<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.js';
	import type { As } from '#lib/types/props.js';

	let {
		//
		as: Tag = 'span',
		class: className = undefined,
		ref = $bindable(null),
		...rest
	}: RootProps<TAs> = $props();

	const split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			class: className
		} as never)
	);

	const attrs = $derived({
		role: 'status',
		'data-slot': 'icon',
		'aria-hiddden': true,
		'aria-label': 'Loading...',
		...split.attrs,
		class: cls
	});
</script>

{#if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}
	></svelte:element>
{:else}
	<Tag bind:ref {...attrs}></Tag>
{/if}
