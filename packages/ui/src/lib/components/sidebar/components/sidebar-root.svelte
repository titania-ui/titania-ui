<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { boxWith } from 'svelte-toolbelt';
	import { sidebarCtx, theme, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/splitVariants.ts';
	import type { As } from '#lib/types/props.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';

	let {
		//
		as: Tag = 'aside',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	sidebarCtx.set({
		variants: boxWith(() => split.variants)
	});

	const attrs = $derived({
		...split.attrs,
		class: cls
	});
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
