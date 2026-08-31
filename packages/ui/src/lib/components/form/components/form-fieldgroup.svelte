<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { formCtx, theme, type FieldGroupProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	const form_ctx = formCtx.get();

	let {
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: FieldGroupProps<TAs> = $props();

	const cls = $derived(
		theme().fieldgroup({
			...form_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'control',
		...rest,
		class: cls
	});
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
