<script lang="ts" module>
	export type LinkBtnProps = { class?: string; disabled?: boolean; ref?: HTMLElement | null } & (
		({ href?: never } & SvelteHTMLElements['button']) | ({ href: string } & SvelteHTMLElements['a'])
	);
</script>

<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { useActivePress } from './useActivePress.ts';
	import { useFocusRing } from './useFocusRing.ts';
	import { useHover } from './useHover.ts';
	import TouchTarget from '$lib/components/button/components/touch-target.svelte';

	let { disabled = false, ref = $bindable(null), children, ...props }: LinkBtnProps = $props();
</script>

{#if typeof props.href === 'string'}
	<a
		bind:this={ref}
		{@attach useHover({ isDisabled: disabled })}
		{@attach useFocusRing()}
		{@attach useActivePress({ disabled })}
		aria-disabled={disabled || undefined}
		data-disabled={disabled || undefined}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : 0}
		{...props}
	>
		<TouchTarget {children} />
	</a>
{:else}
	<button
		bind:this={ref}
		{@attach useHover({ isDisabled: disabled })}
		{@attach useFocusRing()}
		{@attach useActivePress({ disabled })}
		type={props.type || 'button'}
		disabled={disabled || undefined}
		data-disabled={disabled || undefined}
		tabindex="0"
		{...props}
	>
		<TouchTarget {children} />
	</button>
{/if}
