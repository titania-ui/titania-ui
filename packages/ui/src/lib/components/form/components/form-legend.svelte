<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { fieldsetCtx, formCtx, theme, type LegendProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';

	const form_ctx = formCtx.get();
	const ctx = fieldsetCtx.get();
	const uid = $props.id();

	let {
		//
		id = uid,
		as: Tag = 'legend',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: LegendProps<TAs> = $props();

	$effect.pre(() => {
		ctx.legendId.current = id;
		return () => {
			if (ctx.legendId.current === id) ctx.legendId.current = undefined;
		};
	});

	const cls = $derived(
		theme().legend({
			...form_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'legend',
		...rest,
		class: cls
	});
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
