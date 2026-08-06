<script lang="ts">
	import { cx } from 'tailwind-variants/lite';
	import type { RootProps } from './heading.ts';

	let {
		//
		as: Tag = 'code',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: RootProps = $props();

	const classValue = $derived(cx('tacode', className));

	const mergedProps = $derived<RootProps>({ ...props, class: classValue });
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
