<script lang="ts">
	import { cx } from 'tailwind-variants/lite';
	import type { RootProps } from './icon.ts';

	let {
		icon = undefined,
		//
		as: Tag = 'span',
		ref = $bindable(null),
		class: className = undefined,
		render,
		...props
	}: RootProps = $props();

	const classValue = $derived(cx('taicon', className, icon));

	const mergedProps = $derived<RootProps>({
		role: 'img',
		'aria-hidden': 'true',
		'data-slot': 'icon',
		...props,
		class: classValue
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}></svelte:element>
{/if}
