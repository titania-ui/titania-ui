<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { box, boxWith } from 'svelte-toolbelt';
	import { formCtx } from '../form-context.ts';
	import { theme, type RootCfg, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/themeAttrs.js';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { fromStore } from 'svelte/store';
	import { createAttachmentKey, fromAction } from 'svelte/attachments';

	const uid = $props.id();

	let {
		form,
		//
		id = uid,
		as: Tag = 'form',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(theme, rest));

	const __constraints = $derived(fromStore(form.constraints).current);
	const __errors = $derived(fromStore(form.errors).current);

	const ctx = formCtx.set({
		id: boxWith(() => id),
		variants: boxWith(() => split.variants),

		form: boxWith(() => form),
		constraints: boxWith(() => __constraints),
		errors: boxWith(() => __errors)
	});

	const cls = $derived(
		theme().root({
			...split.variants,
			class: className
		} as never)
	);

	const ENHANCE = createAttachmentKey();

	const attrs = $derived({
		'data-slot': 'form',
		method: 'POST',
		enctype: 'multipart/form-data',
		novalidate: true,
		...split.attrs,
		[ENHANCE]: fromAction(form.enhance),
		class: cls,
		id
	});
</script>

{#if child}
	{@render child({
		props: attrs
	} as ChildArgOf<RootCfg>)}
{:else if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref {...attrs}>
		{@render children?.()}
	</Tag>
{/if}
