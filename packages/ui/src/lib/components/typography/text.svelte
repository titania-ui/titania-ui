<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As } from '#lib/types/props.js';
	import { registerId } from '#lib/utils/registerId.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { toggleCtx } from '#lib/utils/toggleContext.js';
	import { type RootProps, theme } from './text.js';

	// Inside a Checkbox / Switch the text acts as the control's description
	const toggle_ctx = toggleCtx.getOr(undefined);
	const uid = $props.id();

	let {
		//
		id = toggle_ctx ? uid : undefined,
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: RootProps<TAs> = $props();

	$effect.pre(() => {
		if (toggle_ctx && id) return registerId(toggle_ctx.descriptionId, id);
	});

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			class: className
		} as never)
	);

	const attrs = $derived({ 'data-slot': 'text', ...split.attrs, class: cls, id });
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
