<script lang="ts">
	import { theme, type RootProps } from './index.ts';
	import { themeAttrs } from '../../utils/themeAttrs.ts';

	let {
		//
		ref = $bindable(null),
		class: className = undefined,
		...props
	}: RootProps = $props();

	const attrs = $derived(themeAttrs(theme, props));

	const classValue = $derived(theme(props).root({ className }));
</script>

<div bind:this={ref} role="status" data-slot="icon" {...attrs} class={classValue}>
	<span aria-hidden="true" class="taspinner__icon" data-slot="icon"></span>
	<span class="sr-only">Loading...</span>
</div>
