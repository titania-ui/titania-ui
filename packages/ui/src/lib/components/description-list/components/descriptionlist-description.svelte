<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type DescriptionProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';

	let {
		//
		as: Tag = 'dd',
		ref = $bindable(null),
		class: className = undefined,
		children,
		...rest
	}: DescriptionProps<TAs> = $props();

	const attrs = $derived({ ...rest, class: theme().description({ className }) });
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
