<script lang="ts">
	import { theme, type RootProps } from '../index.ts';
	import { themeAttrs } from '../../../utils/themeAttrs.ts';
	import { chipCtx } from '../chip-context.ts';
	import { boxWith } from 'svelte-toolbelt';

	const uid = $props.id();

	let {
		dismissed = $bindable(false),
		onDismiss = undefined,
		//
		id = uid,
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: RootProps = $props();

	const attrs = $derived(themeAttrs(theme, props));

	const ctx = chipCtx.set({
		id: boxWith(() => id),
		dismissed: boxWith(
			() => dismissed,
			(v) => {
				dismissed = v;
				if (v) onDismiss?.();
			}
		)
	});

	const classValue = $derived(theme({ className, ...props }));

	const mergedProps = $derived<RootProps>({ 'data-slot': 'chip', id, ...attrs, class: classValue });
</script>

{#if !dismissed}
	{#if render}
		{@render render({ props: mergedProps })}
	{:else}
		<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
			{@render children?.()}
		</svelte:element>
	{/if}
{/if}
