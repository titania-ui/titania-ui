<script lang="ts">
	import { theme, type RootProps } from '../index.ts';
	import { themeAttrs } from '../../../utils/themeAttrs.ts';
	import LinkBtn from '$lib/helpers/link-btn.svelte';

	let {
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

<LinkBtn bind:ref data-slot="button" class={classValue} {disabled} {...attrs} {children} />
