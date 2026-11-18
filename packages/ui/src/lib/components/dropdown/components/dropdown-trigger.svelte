<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Button from '#lib/components/button/index.js';
	import Icon from '#lib/components/typography/icon.js';
	import type { As } from '#lib/types/props.js';
	import { dropdownCtx } from '../dropdown-context.js';
	import { type TriggerProps, theme } from '../index.js';
	import { overrideId } from '../override-id.svelte.js';

	const ctx = dropdownCtx.get();

	let {
		chevron = true,
		//
		id = undefined,
		style = undefined,
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: TriggerProps<TAs> = $props();

	overrideId(ctx.triggerId, () => id);

	const open = $derived(ctx.open.current);

	// Native popover invoker: opens / closes the content without JS, and puts the
	// content right after the trigger in the focus order.
	const attrs = $derived({
		...rest,
		id: ctx.triggerId.current,
		popovertarget: ctx.contentId.current,
		'aria-expanded': open,
		'aria-controls': ctx.contentId.current,
		style: [`anchor-name: ${ctx.anchorName};`, style].filter(Boolean).join(' '),
		class: theme().trigger({ class: className } as never)
	});
</script>

{#snippet body(state: Record<string, unknown>)}
	{@render children?.({ ...state, open } as never)}
	{#if chevron}
		<Icon icon="icon-[flowbite--chevron-down-outline]" class={theme().chevron()} />
	{/if}
{/snippet}

{#snippet asChild(arg: Record<string, unknown>)}
	{@render child?.({ ...arg, open } as never)}
{/snippet}

<Button
	{...attrs as Record<string, unknown>}
	bind:ref={ref as never}
	child={child ? (asChild as never) : undefined}
	children={body as never}
/>
