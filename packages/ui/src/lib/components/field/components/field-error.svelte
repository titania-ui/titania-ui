<script lang="ts" generics="TAs extends As | undefined = undefined">
	import { formCtx } from '#lib/components/form/form-context.js';
	import { announce } from '#lib/helpers/announcer.js';
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { registerId } from '#lib/utils/registerId.js';
	import { type ErrorCfg, type ErrorProps, fieldCtx, theme } from '../index.js';

	const field_ctx = fieldCtx.get();
	const form_ctx = formCtx.getOr(undefined);
	const uid = $props.id();

	let {
		label: errorLabel = 'Error',
		//
		id = uid,
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		child,
		...rest
	}: ErrorProps<TAs> = $props();

	const cls = $derived(
		theme().error({
			...field_ctx.variants.current,
			class: className
		} as never)
	);

	const attrs = $derived({
		'data-slot': 'error',
		...rest,
		class: cls,
		id
	});

	const hasError = $derived(field_ctx.errors.current.length > 0);

	$effect.pre(() => {
		if (hasError) return registerId(field_ctx.errorId, id);
	});

	// The message itself is not a live region (it is mounted together with its text, which screen readers don't reliably announce):
	// changes are written into the global <Announcer /> instead.
	// Debounced so live validation doesn't speak on every keystroke.
	const ANNOUNCE_DELAY = 800;
	let announced = '';
	$effect(() => {
		const text = field_ctx.errors.current.join('. ');
		if (!text) {
			announced = '';
			return;
		}
		if (text === announced) return;
		const timer = setTimeout(() => {
			announced = text;
			// A failed submit moves focus, which reads the error; don't speak it twice.
			if (form_ctx?.submitPending.current) return;
			const name = field_ctx.labelId.current
				? document.getElementById(field_ctx.labelId.current)?.textContent?.trim()
				: undefined;
			announce(name ? `${name}: ${text}` : text, { afterLoad: true });
		}, ANNOUNCE_DELAY);
		return () => clearTimeout(timer);
	});
</script>

{#if hasError}
	<Polymorphic
		tag={Tag}
		{attrs}
		bind:ref
		{child}
		childArg={{ props: attrs, errors: field_ctx.errors.current } as ChildArgOf<ErrorCfg>}
	>
		<span class="sr-only">{errorLabel}:</span>
		<span>
			{#each field_ctx.errors.current as message, i (i)}
				{#if i > 0}<br />{/if}{message}
			{/each}
		</span>
	</Polymorphic>
{/if}
