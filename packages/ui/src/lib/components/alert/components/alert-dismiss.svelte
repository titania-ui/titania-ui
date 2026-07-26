<script lang="ts">
	import type { DismissProps } from '../index.ts';
	import { CloseButton } from '../../../index.ts';
	import { alertCtx } from '../alert-context.ts';

	const ctx = alertCtx.get();

	let {
		as: Tag = undefined,
		ref = $bindable(null),
		class: className = undefined,
		render,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		children, // needs to be destructure for rest props
		onclick,
		...props
	}: DismissProps = $props();

	const mergedProps = $derived<DismissProps>({
		'aria-controls': ctx.id.current,
		...props,
		onclick: (e: MouseEvent) => {
			onclick?.(e);
			if (!e.defaultPrevented) ctx.dismissed.current = true;
		},
		class: className
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<CloseButton as={Tag} bind:ref {...mergedProps} />
{/if}
