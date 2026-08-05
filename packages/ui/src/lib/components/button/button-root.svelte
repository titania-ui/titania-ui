<script lang="ts">
	import { theme, type RootProps } from './index.ts';
	import { themeAttrs } from '../../utils/themeAttrs.ts';
	import { useHover, useFocusRing, useActivePress } from '../../index.ts';

	let {
		href,
		disabled = false,
		//
		ref = $bindable(null),
		class: className = undefined,
		children,
		...props
	}: RootProps = $props();

	const attrs = $derived(themeAttrs(theme, props));

	const classValue = $derived(theme({ disabled, className, ...props } as never));
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		{href}
		aria-disabled={disabled || undefined}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : 0}
		{...attrs}
		class={classValue}
		{@attach useHover({ isDisabled: disabled })}
		{@attach useFocusRing()}
		{@attach useActivePress({ disabled })}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		tabindex="0"
		data-slot="button"
		{disabled}
		{...attrs}
		class={classValue}
		{@attach useHover({ isDisabled: disabled })}
		{@attach useFocusRing()}
		{@attach useActivePress({ disabled })}
	>
		{@render children?.()}
	</button>
{/if}
