<script lang="ts">
	import { theme, type RootProps } from '../index.ts';
	import { themeAttrs } from '#lib/utils/themeAttrs.js';
	import { descriptionListCtx } from '../dl-context.ts';
	import { boxWith } from 'svelte-toolbelt';

	let {
		//
		as: Tag = 'dl',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: RootProps = $props();

	const slots = $derived(theme(props));

	descriptionListCtx.set({
		slots: boxWith(() => slots)
	});

	const attrs = $derived(themeAttrs(theme, props));

	const mergedProps = $derived<RootProps>({ ...attrs, class: slots.root({ className }) });
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
