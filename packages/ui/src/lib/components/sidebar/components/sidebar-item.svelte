<script lang="ts">
	import { type ItemProps } from '../index.ts';
	import { sidebarCtx } from '../sidebar-context.ts';
	import LinkBtn from '$lib/helpers/link-btn.svelte';

	const ctx = sidebarCtx.get();

	let {
		current = false,
		disabled = false,
		//
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: ItemProps = $props();

	const mergedProps = $derived({
		...props,
		disabled,
		'aria-current': current ? 'page' : undefined,
		class: ctx.slots.current.item({ className, current, disabled } as never)
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<li class={ctx.slots.current.item_wrapper()}>
		<LinkBtn bind:ref {disabled} {...mergedProps} {children} />
	</li>
{/if}
