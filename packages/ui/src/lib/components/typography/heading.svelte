<script lang="ts">
	import { cx } from 'tailwind-variants/lite';
	import type { RootProps } from './heading.ts';

	let {
		level = 1,
		//
		as: Tag = undefined,
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: RootProps = $props();

	const classValue = $derived(
		cx(
			'taheading',
			level === 1 && 'taheading--level-1',
			level === 2 && 'taheading--level-2',
			level === 3 && 'taheading--level-3',
			level === 4 && 'taheading--level-4',
			level === 5 && 'taheading--level-5',
			level === 6 && 'taheading--level-6',
			className
		)
	);

	const mergedProps = $derived<RootProps>({
		role: 'heading',
		'aria-level': level,
		...props,
		class: classValue
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={!Tag ? `h${level}` : Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
