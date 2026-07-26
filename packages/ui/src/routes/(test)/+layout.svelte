<script lang="ts">
	import '../../lib/theme/flowbite.css';

	const { children } = $props();
</script>

<main class="p-8">
	{@render children()}
</main>
