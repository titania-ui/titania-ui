<script lang="ts" module>
	type T = unknown;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { rootTheme, type RootProps } from '../index.ts';
	import { themeAttrs } from '../../../utils/index.ts';
	import { boxWith } from 'svelte-toolbelt';
	import { formCtx } from '../form-context.ts';
	import { fromStore } from 'svelte/store';

	const uid = $props.id();

	let {
		form,
		//
		id = uid,
		as: Tag = 'form',
		ref = $bindable(null),
		class: className = undefined,
		render,
		children,
		...props
	}: RootProps<T> = $props();

	const slots = $derived(rootTheme(props));
	const attrs = $derived(themeAttrs(rootTheme, props));

	const __constraints = $derived(fromStore(form.constraints).current);
	const __errors = $derived(fromStore(form.errors).current);

	formCtx.set({
		id: boxWith(() => id),
		slots: boxWith(() => slots),
		attrs: boxWith(() => attrs),
		form: boxWith(() => form),
		constraints: boxWith(() => __constraints),
		errors: boxWith(() => __errors)
	});

	const mergedProps = $derived({
		'data-slot': 'form',
		...attrs,
		id,
		class: slots.root({ className })
	});
</script>

{#if render}
	{@render render({ props: mergedProps })}
{:else}
	<svelte:element this={Tag} bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</svelte:element>
{/if}
