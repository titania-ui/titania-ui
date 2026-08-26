<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { sidebarCtx, theme, type SpacerProps } from '../index.ts';
	import type { As } from '#lib/types/props.js';

	const ctx = sidebarCtx.get();

	let {
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		...rest
	}: SpacerProps<TAs> = $props();

	const cls = $derived(
		theme().spacer({
			...ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		...rest,
		class: cls
	});
</script>

{#if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}
	></svelte:element>
{:else}
	<Tag bind:ref {...attrs} />
{/if}
