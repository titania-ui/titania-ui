<script
	lang="ts"
	generics="TAs extends As | undefined = undefined, THref extends string | undefined = undefined"
>
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { useHover } from '#lib/helpers/useHover.js';
	import { usePressableTag } from '#lib/helpers/usePressableTag.svelte.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { dropdownCtx, dropdownListCtx } from '../dropdown-context.js';
	import { type ItemCfg, type ItemProps, theme } from '../index.js';
	import { createAttachmentKey } from 'svelte/attachments';

	const INTERACTIVE = 'input, label, button, a[href], select, textarea, [contenteditable]';
	const TOGGLES = 'input[type="checkbox"], input[type="radio"]';

	const ctx = dropdownCtx.get();
	const inList = dropdownListCtx.exists();

	let {
		href = undefined,
		disabled = false,
		danger = false,
		plain = false,
		//
		as: _Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: ItemProps<TAs, THref> = $props();

	// <a> with href, <button> with onclick, otherwise a plain row for e.g. a Checkbox / Switch
	const pressable = usePressableTag({
		as: () => _Tag as As | undefined,
		href: () => href,
		disabled: () => disabled,
		type: () => rest.type,
		onclick: () => rest.onclick,
		fallbackTag: () => 'div'
	});

	const interactive = $derived(pressable.tag === 'a' || pressable.tag === 'button');

	// Pressable rows get hover from usePressableTag; a plain row still highlights
	// while it hosts a control, so wire hover up for it separately.
	const HOVER = createAttachmentKey();
	const rowHover = $derived(
		!interactive && !plain ? { [HOVER]: useHover({ disabled }) } : undefined
	);

	// Picking an action or link closes the dropdown, focus returns to the trigger.
	// Calling `preventDefault()` in your own onclick keeps it open.
	function onclick(e: MouseEvent) {
		(pressable.attrs.onclick as ((e: MouseEvent) => void) | undefined)?.(e);
		if (!disabled && !e.defaultPrevented) ctx.open.current = false;
	}

	// A row hosting a single Checkbox / Switch toggles it from anywhere, the way a
	// wrapping <label> would. Clicks on the control or its label handle themselves.
	function onRowClick(e: MouseEvent & { currentTarget: HTMLElement }) {
		if (disabled) return;
		(rest.onclick as ((e: MouseEvent) => void) | undefined)?.(e);
		if (e.defaultPrevented || (e.target as Element | null)?.closest(INTERACTIVE)) return;
		const inputs = e.currentTarget.querySelectorAll<HTMLInputElement>(TOGGLES);
		if (inputs.length === 1) inputs[0].click();
	}

	const childrenState = $derived({
		disabled,
		...pressable.state
	});

	const cls = $derived(
		theme().item({
			danger,
			plain,
			disabled,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'dropdown-item',
		'data-disabled': disabled ? '' : undefined,
		...rest,
		...rowHover,
		...pressable.attrs,
		onclick: interactive ? onclick : onRowClick,
		class: cls
	});
</script>

{#snippet body()}
	{@render children?.(childrenState)}
{/snippet}

{#snippet item()}
	<Polymorphic
		tag={pressable.tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs, ...childrenState } as ChildArgOf<ItemCfg>}
		children={body}
	/>
{/snippet}

{#if inList}
	<li class={theme().item_wrapper()}>
		{@render item()}
	</li>
{:else}
	{@render item()}
{/if}
