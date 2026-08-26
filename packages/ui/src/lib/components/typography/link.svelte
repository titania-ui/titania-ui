<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { theme, type RootProps } from './link.ts';
	import type { As } from '#lib/types/props.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.ts';
	import { useHover } from '#lib/helpers/useHover.js';
	import { createAttachmentKey } from 'svelte/attachments';

	let {
		disabled = false,
		//
		as: Tag = 'a',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const cls = $derived(
		theme({
			disabled,
			...split.variants,
			class: className
		} as never)
	);

	const HOVER = createAttachmentKey();

	const attrs = $derived({
		'aria-disabled': disabled ? 'true' : undefined,
		...split.attrs,
		class: cls,
		[HOVER]: useHover({ isDisabled: disabled })
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
