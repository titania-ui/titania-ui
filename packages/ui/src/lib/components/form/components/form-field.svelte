<script lang="ts">
	import { themeAttrs } from '../../../utils/index.ts';
	import { box, boxWith } from 'svelte-toolbelt';
	import { fieldCtx, formCtx } from '../form-context.ts';
	import { fieldTheme, type FieldProps } from '../index.ts';

	let {
		name,
		//
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: FieldProps = $props();

	const slots = $derived(fieldTheme(props));
	const attrs = $derived(themeAttrs(fieldTheme, props));

	const form_ctx = formCtx.get();

	const _errors = form_ctx.form.current.errors;
	const _constraints = form_ctx.form.current.constraints;
	let errors = $derived($_errors[name]);
	let constraints = $derived($_constraints[name]);

	const ctx = fieldCtx.set({
		name: boxWith(() => name),
		slots: boxWith(() => slots),
		attrs: boxWith(() => attrs),
		labelId: box<string | undefined>(undefined),
		inputId: box<string | undefined>(undefined),
		errors: boxWith(() => errors),
		constraints: boxWith(() => constraints)
	});

	const mergedProps = $derived({
		'data-slot': 'field',
		'data-invalid': ctx.errors.current ? '' : undefined,
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
