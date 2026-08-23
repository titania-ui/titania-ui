<script
	lang="ts"
	generics="TAs extends As | undefined = undefined, THref extends string | undefined = undefined"
>
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { splitVariants } from '../../../utils/themeAttrs.ts';
	import type { As, ChildArgOf } from '../../../types/props.ts';
	import { createAttachmentKey } from 'svelte/attachments';
	import { useActivePress } from '../../../helpers/useActivePress.ts';
	import { useFocusRing } from '../../../helpers/useFocusRing.ts';
	import { useHover } from '../../../helpers/useHover.ts';

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

	const attrs = $derived({
		'data-slot': 'button',
		...split.attrs,
		class: cls,
		[HOVER]: useHover({ isDisabled: disabled }),
		[FOCUS]: useFocusRing(),
		[PRESS]: useActivePress({ disabled }),
		...(Tag === 'button'
			? {
					type: split.attrs.type ?? 'button',
					disabled: state.disabled || undefined,
					tabindex: split.attrs.type ?? '0'
				}
			: {
					href: state.disabled ? undefined : href,
					'aria-disabled': state.disabled || undefined,
					tabindex: state.disabled ? -1 : (split.attrs.type ?? 0),
					role: state.disabled ? (split.attrs.type ?? 'link') : undefined,
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
		{@render children?.(state)}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs}>
		{@render children?.(state)}
	</Tag>
{/if}
