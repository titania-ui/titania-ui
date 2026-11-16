<script lang="ts">
	import { markReady, registerRegion } from '#lib/helpers/announcer.js';
	import { onMount } from 'svelte';

	let polite: HTMLElement | undefined = $state();
	let assertive: HTMLElement | undefined = $state();

	$effect(() => {
		if (polite) return registerRegion('polite', polite);
	});
	$effect(() => {
		if (assertive) return registerRegion('assertive', assertive);
	});

	onMount(() => {
		// Let the rest of the page finish its first render before counting as "after load".
		let off: (() => void) | undefined;
		const t = setTimeout(() => (off = markReady()), 0);
		return () => {
			clearTimeout(t);
			off?.();
		};
	});
</script>

<div data-slot="announcer" class="sr-only">
	<div bind:this={polite} role="status" aria-live="polite" aria-atomic="true"></div>
	<div bind:this={assertive} role="alert" aria-live="assertive" aria-atomic="true"></div>
</div>
