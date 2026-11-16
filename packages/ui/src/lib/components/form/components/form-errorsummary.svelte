<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { collectFormErrors } from '#lib/utils/formErrors.js';
	import { type ErrorSummaryCfg, type ErrorSummaryProps, formCtx, theme } from '../index.js';

	const form_ctx = formCtx.get();
	const uid = $props.id();

	let {
		title = (n: number) => (n === 1 ? '1 error' : `${n} errors`),
		//
		id = uid,
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		child,
		...rest
	}: ErrorSummaryProps<TAs> = $props();

	const items = $derived(collectFormErrors(form_ctx.errors.current));

	/** The visible name of a field: its labelling element, a native label, then `aria-label`. */
	function labelOf(name: string) {
		const el = name && typeof document !== 'undefined' ? document.getElementById(name) : null;
		if (!el) return '';
		const text = (el.getAttribute('aria-labelledby') ?? '')
			.split(/\s+/)
			.map((id) => document.getElementById(id)?.textContent?.trim())
			.filter(Boolean)
			.join(' ');
		return (
			text ||
			(el as HTMLInputElement).labels?.[0]?.textContent?.trim() ||
			el.getAttribute('aria-label')?.trim() ||
			''
		);
	}

	function hasTarget(name: string) {
		return typeof document !== 'undefined' && document.getElementById(name) !== null;
	}

	function focusField(e: MouseEvent, name: string) {
		const el = name ? document.getElementById(name) : null;
		if (!el) return;
		e.preventDefault();
		el.focus();
	}

	const cls = $derived(
		theme().errorsummary({
			...form_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'error-summary',
		role: 'region',
		tabindex: -1,
		'aria-labelledby': `${id}-title`,
		...rest,
		class: cls,
		id
	});
</script>

{#if items.length > 0}
	<Polymorphic
		tag={Tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs, items } as ChildArgOf<ErrorSummaryCfg>}
	>
		<p id="{id}-title" class="taform__errorsummary-title">{title(items.length)}</p>
		<ul>
			{#each items as item (item.name + item.messages.join())}
				{@const label = labelOf(item.name)}
				<li>
					{#if label}
						<a href="#{item.name}" onclick={(e) => focusField(e, item.name)}>{label}:</a>
						{item.messages.join(' ')}
					{:else if item.name && hasTarget(item.name)}
						<!-- No visible name to show: the message itself is the link -->
						<a href="#{item.name}" onclick={(e) => focusField(e, item.name)}>
							{item.messages.join(' ')}
						</a>
					{:else}
						{item.messages.join(' ')}
					{/if}
				</li>
			{/each}
		</ul>
	</Polymorphic>
{/if}
