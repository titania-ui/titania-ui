<script lang="ts">
	import { theme, type RootProps } from '../index.ts';
	import { themeAttrs } from '../../../utils/index.ts';
	import { box, boxWith } from 'svelte-toolbelt';
	import { alertCtx } from '../alert-context.ts';

	const uid = $props.id();

	let {
		dismissed = $bindable(false),
		onDismiss = undefined,
		//
		id = uid,
		as: Tag = 'div',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: RootProps = $props();

	const slots = $derived(theme(props));
	const attrs = $derived(themeAttrs(theme, props));

	const ctx = alertCtx.set({
		id: boxWith(() => id),
		slots: boxWith(() => slots),
		attrs: boxWith(() => attrs),
		titleId: box<string | undefined>(undefined),
		descriptionId: box<string | undefined>(undefined),
		dismissed: boxWith(
			() => dismissed,
			(v) => {
				dismissed = v;
				if (v) onDismiss?.();
			}
		)
	});

	const role = $derived(
		props.status === 'warning' || props.status === 'danger' ? 'alert' : 'status'
	);

	const mergedProps = $derived<RootProps>({
		role,
		'aria-atomic': 'true',
		'aria-labelledby': ctx.titleId.current,
		'aria-describedby': ctx.descriptionId.current,
		'data-slot': 'alert',
		...attrs,
		...props,
		id,
		class: slots.root({ className })
	});
</script>

{#if !dismissed}
	{#if render}
		{@render render({ props: mergedProps })}
	{:else}
		<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
			{@render children?.()}
		</svelte:element>
	{/if}
{/if}
