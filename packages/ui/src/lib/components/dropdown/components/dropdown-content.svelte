<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { dropdownCtx } from '../dropdown-context.js';
	import { type ContentCfg, type ContentProps, theme } from '../index.js';
	import { overrideId } from '../override-id.svelte.js';

	const ctx = dropdownCtx.get();

	let {
		//
		id = undefined,
		style = undefined,
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		ontoggle: userOntoggle = undefined,
		onfocusout: userOnfocusout = undefined,
		...rest
	}: ContentProps<TAs> = $props();

	overrideId(ctx.contentId, () => id);

	const open = $derived(ctx.open.current);

	const trigger = () => document.getElementById(ctx.triggerId.current);

	// The native popover owns the open state (trigger click, Esc, light dismiss);
	// this only pushes a programmatic change of the bindable `open` into it.
	$effect(() => {
		const el = ref;
		if (!(el instanceof HTMLElement)) return;
		const shown = el.matches(':popover-open');
		if (open && !shown) el.showPopover({ source: trigger() } as never);
		else if (!open && shown) {
			// Closing from inside (an item was picked) hands focus back to the trigger.
			// Native restore isn't enough: Safari never focuses a clicked button.
			const hadFocus = el.contains(document.activeElement);
			el.hidePopover();
			if (hadFocus) trigger()?.focus();
		}
	});

	function ontoggle(e: ToggleEvent) {
		ctx.open.current = e.newState === 'open';
		(userOntoggle as ((e: ToggleEvent) => void) | undefined)?.(e);
	}

	// Tabbing past the last item (or anywhere else outside) closes the content,
	// like a disclosure should. Shift+Tab back onto the trigger keeps it open.
	function onfocusout(e: FocusEvent) {
		(userOnfocusout as ((e: FocusEvent) => void) | undefined)?.(e);
		const next = e.relatedTarget as Node | null;
		if (!next || (e.currentTarget as Node).contains(next) || trigger()?.contains(next)) return;
		ctx.open.current = false;
	}

	const cls = $derived(
		theme().content({
			placement: ctx.placement(),
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'dropdown-content',
		...rest,
		id: ctx.contentId.current,
		popover: 'auto',
		style: [`position-anchor: ${ctx.anchorName};`, style].filter(Boolean).join(' '),
		ontoggle,
		onfocusout,
		class: cls
	});
</script>

{#snippet body()}
	{@render children?.({ open })}
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs, open } as ChildArgOf<ContentCfg>}
	children={body}
/>
