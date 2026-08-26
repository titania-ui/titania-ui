<script lang="ts" generics="TAs extends As | undefined = undefined">
	import type { As } from '#lib/types/props.ts';
	import { theme, type RootProps } from '../index.ts';

	let {
		//
		as: Tag = 'dl',
		ref = $bindable(null),
		class: className = undefined,
		children,
		...rest
	}: RootProps<TAs> = $props();

	const attrs = $derived({ ...rest, class: theme().root({ className }) });
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
