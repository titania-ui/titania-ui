<script
	lang="ts"
	generics="TAs extends As | undefined = undefined, THref extends string | undefined = undefined"
>
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { createAttachmentKey } from 'svelte/attachments';
	import { useActivePress } from '#lib/helpers/useActivePress.js';
	import { useFocusRing } from '#lib/helpers/useFocusRing.js';
	import { useHover } from '#lib/helpers/useHover.js';
	import TouchTarget from '#lib/helpers/touch-target.svelte';

	let {
		href,
		pending = false,
		disabled = false,
		//
		as: _Tag,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs, THref> = $props();

	const Tag = $derived<As>(_Tag ?? (href != null ? 'a' : 'button'));

	const state = $derived({ pending, disabled });

	const split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			...split.variants,
			disabled: state.disabled,
			pending: state.pending,
			class: className
		} as never)
	);

	const HOVER = createAttachmentKey();
	const FOCUS = createAttachmentKey();
	const PRESS = createAttachmentKey();

	let isDisabled = $derived(state.disabled || state.pending);

	const attrs = $derived({
		'data-slot': 'button',
		...split.attrs,
		class: cls,
		[HOVER]: useHover({ isDisabled }),
		[FOCUS]: useFocusRing(),
		[PRESS]: useActivePress({ disabled: isDisabled }),
		...(Tag === 'button'
			? {
					type: split.attrs.type ?? 'button',
					disabled: isDisabled || undefined,
					tabindex: split.attrs.type ?? '0'
				}
			: {
					href: isDisabled ? undefined : href,
					'aria-disabled': isDisabled || undefined,
					tabindex: isDisabled ? -1 : (split.attrs.type ?? 0),
					role: isDisabled ? (split.attrs.type ?? 'link') : undefined,
					onclick: disabled ? undefined : split.attrs.onclick
				})
	});
</script>

{#if child}
	{@render child({
		props: attrs,
		pending: state.pending,
		disabled: state.disabled
	} as ChildArgOf<RootCfg>)}
{:else if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		<TouchTarget>
			{@render children?.(state)}
		</TouchTarget>
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs}>
		<TouchTarget>
			{@render children?.(state)}
		</TouchTarget>
	</Tag>
{/if}
