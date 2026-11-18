<script lang="ts" generics="TAs extends As | undefined = undefined">
	import type { As } from '#lib/types/props.js';
	import { alertDialogCtx } from '../alert-dialog-context.js';
	import { type ContentProps, theme } from '../index.js';
	import { AlertDialog as Primitive } from 'bits-ui';

	const ctx = alertDialogCtx.get();

	let {
		to = undefined,
		//
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: ContentProps<TAs> = $props();

	// Focus the least destructive control on open (WAI-ARIA APG alertdialog), not the
	// confirm button. The corner Close is skipped so the footer's Cancel wins.
	function onOpenAutoFocus(e: Event) {
		const cancel = (ref as HTMLElement | null)?.querySelector<HTMLElement>(
			'[data-alert-dialog-cancel]:not([data-alert-dialog-close])'
		);
		if (!cancel) return;
		e.preventDefault();
		cancel.focus();
	}

	const attrs = $derived({
		'data-slot': 'alert-dialog',
		...rest,
		class: theme().content({ status: ctx.status.current, class: className } as never)
	});
</script>

<Primitive.Portal {to}>
	<Primitive.Overlay data-slot="alert-dialog-overlay" class={theme().overlay()} />
	<Primitive.Content
		{...attrs as Record<string, unknown>}
		bind:ref={ref as never}
		{onOpenAutoFocus}
		child={child as never}
	>
		{@render children?.()}
	</Primitive.Content>
</Primitive.Portal>
