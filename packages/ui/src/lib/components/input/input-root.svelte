<script lang="ts">
	import { theme, type RootProps } from './index.ts';
	import { themeAttrs } from '../../utils/themeAttrs.ts';
	import { controlCtx, fieldCtx, formCtx } from '../form/form-context.ts';
	import { fieldValue } from '../form/field-value.svelte.ts';

	let {
		value = $bindable(null),
		invalid = false,
		disabled = false,
		//
		ref = $bindable(null),
		class: className = undefined,
		...props
	}: RootProps = $props();

	const attrs = $derived(themeAttrs(theme, props));

	const slots = $derived(
		controlCtx.exists()
			? theme({
					...props,
					invalid: fieldCtx.get().disabled,
					disabled: fieldCtx.get().disabled
				} as never)
			: theme({ ...props, invalid, disabled } as never)
	);
</script>

<span data-slot="control" class={slots.wrapper()}>
	{#if controlCtx.exists() && fieldCtx.exists() && formCtx.exists()}
		{let ctx = controlCtx.get()}
		{let val = fieldValue(
			() => value,
			(v) => (value = v)
		)}
		<input
			bind:this={ref}
			bind:value={() => val.current, (v) => (val.current = v)}
			{...ctx.props.current}
			{...attrs}
			class={slots.root({ className, invalid: ctx.props.current['aria-invalid'] === 'true' })}
		/>
	{:else}
		<input
			bind:this={ref}
			bind:value
			disabled={disabled || undefined}
			aria-invalid={invalid || undefined}
			{...attrs}
			class={slots.root({ className })}
		/>
	{/if}
</span>
