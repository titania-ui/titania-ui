<script lang="ts">
	import { Announcer } from '#lib';
	import '../../lib/theme/flowbite/index.css';
	import { onMount } from 'svelte';

	const { children } = $props();

	let dark = $state(false);

	onMount(() => {
		let saved: string | null = localStorage.getItem('demo-theme');
		dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
	});

	$effect.pre(() => {
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('demo-theme', dark ? 'dark' : 'light');
	});
</script>

<Announcer />
{@render children()}

<button
	type="button"
	aria-label="Dark mode"
	aria-pressed={dark}
	onclick={() => (dark = !dark)}
	style="position: fixed; top: 1rem; right: 1rem; z-index: 100; display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; padding: 0; border-radius: 9999px; cursor: pointer; border: 1px solid {dark
		? '#374151'
		: '#e5e7eb'}; background: {dark ? '#111827' : '#ffffff'}; color: {dark
		? '#f9fafb'
		: '#111827'}; box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);"
>
	{#if dark}
		<svg
			aria-hidden="true"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	{:else}
		<svg
			aria-hidden="true"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
			/>
		</svg>
	{/if}
</button>
