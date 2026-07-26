<script lang="ts">
	import { theme, type RootProps } from './index.ts';
	import { themeAttrs } from '../../utils/themeAttrs.ts';
	import { Icon } from '../../index.ts';

	let {
		//
		ref = $bindable(null),
		class: className = undefined,
		children,
		...props
	}: RootProps = $props();

	const attrs = $derived(themeAttrs(theme, props));

	const classValue = $derived(theme(props).root({ className }));
</script>

<button bind:this={ref} data-slot="button" {...attrs} class={classValue}>
	{#if children}
		{@render children?.()}
	{:else}
		<Icon class="taclosebutton__default" />
	{/if}
	<span class="sr-only">Close</span>
</button>
