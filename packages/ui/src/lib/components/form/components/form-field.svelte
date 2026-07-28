<script lang="ts">
	import { themeAttrs } from '../../../utils/index.ts';
	import { box, boxWith } from 'svelte-toolbelt';
	import { fieldCtx, formCtx } from '../form-context.ts';
	import { fieldTheme, type FieldProps } from '../index.ts';

	let {
		auto = false,
		name = undefined,
		required = false,
		disabled = false,
		errors = [],
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: FieldProps = $props();

	const form_ctx = formCtx.get();

	$effect.pre(() => {
		if (auto && !name) throw new Error('Form.Field: "name" is required when "auto" is true');
		if (!form_ctx) throw new Error('Form.Field: "auto" requires a parent Form.Root component');
	});

	const __errors = $derived<string[]>(
		!auto ? errors : name ? (form_ctx.errors.current?.[name] ?? []) : []
	);
	const __constraints = $derived<Record<string, unknown>>(
		name ? form_ctx.constraints.current?.[name] : {}
	);
	const __required = $derived<boolean>(!auto ? required : (__constraints?.required ?? false));

	const slots = $derived(
		fieldTheme({ auto, required, disabled, invalid: __errors.length > 0, ...props })
	);
	const attrs = $derived(themeAttrs(fieldTheme, props));

	const ctx = fieldCtx.set({
		name: boxWith(() => name ?? ''),
		slots: boxWith(() => slots),
		attrs: boxWith(() => attrs),

		labelId: box<string | undefined>(undefined),
		inputId: box<string | undefined>(undefined),

		auto: boxWith(() => auto),
		required: boxWith(() => __required),
		disabled: boxWith(() => disabled),
		errors: boxWith(() => __errors),
		constraints: boxWith(() => __constraints)
	});

	const mergedProps = $derived({
		'data-slot': 'field',
		...ctx.attrs.current,
		...props,
		class: ctx.slots.current.root({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
