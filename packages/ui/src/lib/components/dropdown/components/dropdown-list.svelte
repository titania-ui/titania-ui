<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { dropdownCtx, dropdownListCtx } from '../dropdown-context.js';
	import { type ListCfg, type ListProps, theme } from '../index.js';

	const ctx = dropdownCtx.get();
	dropdownListCtx.set(true);

	let {
		//
		as: Tag = 'ul',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: ListProps<TAs> = $props();

	// Named after the trigger unless the consumer names it (e.g. after a Header)
	const named = $derived.by(() => {
		const own = rest as Record<string, unknown>;
		return own['aria-label'] != null || own['aria-labelledby'] != null;
	});

	const attrs = $derived({
		'data-slot': 'dropdown-list',
		'aria-labelledby': named ? undefined : ctx.triggerId.current,
		...rest,
		class: theme().list({ class: className } as never)
	});
</script>

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<ListCfg>}
	{children}
/>
