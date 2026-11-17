<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As } from '#lib/types/props.js';
	import { dropdownListCtx } from '../dropdown-context.js';
	import { type DividerProps, theme } from '../index.js';

	const inList = dropdownListCtx.exists();

	let {
		//
		as: Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		...rest
	}: DividerProps<TAs> = $props();

	// Between lists it's a real separator (<hr>). A list may only hold list items,
	// so inside one it's a decorative <li> hidden from assistive tech.
	const attrs = $derived({
		'data-slot': 'dropdown-divider',
		'aria-hidden': inList ? 'true' : undefined,
		...rest,
		class: theme().divider({ class: className } as never)
	});
</script>

<Polymorphic tag={Tag ?? (inList ? 'li' : 'hr')} {attrs} bind:ref />
