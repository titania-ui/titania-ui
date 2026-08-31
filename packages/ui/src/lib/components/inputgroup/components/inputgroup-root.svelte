<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { boxWith } from 'svelte-toolbelt';
	import { inputGroupCtx, theme, type RootProps } from '../index.ts';
	import { splitVariants } from '#lib/utils/splitVariants.ts';
	import type { As } from '#lib/types/props.ts';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import { fieldCtx } from '#lib/components/field/field-context.ts';
	import { fieldInvalid } from '#lib/utils/fieldControl.ts';

	let field_ctx = fieldCtx.getOr(undefined);

	let {
		invalid = undefined,
		disabled = undefined,
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		...rest
	}: RootProps<TAs> = $props();

	const __invalid = $derived(fieldInvalid(field_ctx, invalid));
	const __disabled = $derived(field_ctx ? field_ctx.disabled.current : disabled);

	let split = $derived(splitVariants(theme, { ...rest, invalid: __invalid, disabled: __disabled }));

	const cls = $derived(
		theme().root({
			...split.variants,
			invalid: __invalid,
			disabled: __disabled,
			class: className
		} as never)
	);

	inputGroupCtx.set({
		variants: boxWith(() => split.variants)
	});

	const attrs = $derived({
		'data-slot': 'control',
		...split.attrs,
		class: cls
	});
</script>

<Polymorphic tag={Tag} {attrs} bind:ref {children} />
