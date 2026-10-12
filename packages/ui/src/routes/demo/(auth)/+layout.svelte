<script lang="ts">
	const { children } = $props();
</script>

<div class="flex min-h-lvh w-full items-center justify-center px-6 py-8">
	{@render children()}
</div>
