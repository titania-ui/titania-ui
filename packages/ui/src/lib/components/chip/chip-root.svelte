<script lang="ts">
	import { theme, type RootProps } from './index.ts';
	import { themeAttrs } from '../../utils/themeAttrs.ts';

	let {
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: RootProps = $props();

	const attrs = $derived(themeAttrs(theme, props));

	const classValue = $derived(theme({ className, ...props }));

	const mergedProps = $derived<RootProps>({ 'data-slot': 'chip', ...attrs, class: classValue });
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
