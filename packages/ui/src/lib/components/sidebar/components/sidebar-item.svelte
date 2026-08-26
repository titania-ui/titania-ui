<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { sidebarCtx, theme, type ItemProps } from '../index.ts';
	import type { As } from '#lib/types/props.ts';
	import { useHover } from '#lib/helpers/useHover.js';
	import { createAttachmentKey } from 'svelte/attachments';
	import { useFocusRing } from '#lib/helpers/useFocusRing.ts';
	import { useActivePress } from '#lib/helpers/useActivePress.ts';

	const ctx = sidebarCtx.get();

	let {
		current = false,
		disabled = false,
		href = undefined,
		//
		as: _Tag = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: ItemProps<TAs> = $props();

	const Tag = $derived<As>(_Tag ?? (href != null ? 'a' : 'button'));

	let _HOVERED = $state(false);
	let _PRESSED = $state(false);
	let _FOCUSED = $state(false);

	const childrenState = $derived({
		disabled,
		current,
		hovered: _HOVERED,
		pressed: _PRESSED,
		focused: _FOCUSED
	});

	const cls = $derived(
		theme().item({
			disabled,
			current,
			...ctx.variants.current,
			class: className
		} as never)
	);

	const HOVER = createAttachmentKey();
	const FOCUS = createAttachmentKey();
	const PRESS = createAttachmentKey();

	const attrs = $derived({
		'data-slot': 'button',
		...rest,
		class: cls,
		[HOVER]: useHover({ isDisabled: disabled, onHoverChange: (v) => (_HOVERED = v) }),
		[FOCUS]: useFocusRing({ onFocusVisibleChange: (v) => (_FOCUSED = v) }),
		[PRESS]: useActivePress({ disabled, onPressedChange: (v) => (_PRESSED = v) }),
		...(Tag === 'button'
			? {
					type: rest.type ?? 'button',
					disabled: disabled || undefined,
					tabindex: rest.type ?? '0'
				}
			: {
					href: disabled ? undefined : href,
					'aria-disabled': disabled || undefined,
					tabindex: disabled ? -1 : (rest.type ?? 0),
					role: disabled ? (rest.type ?? 'link') : undefined,
					onclick: disabled ? undefined : rest.onclick
				})
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
