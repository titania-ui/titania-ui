<script lang="ts">
	import '../../lib/theme/cataclyst.css';

	const { children } = $props();
</script>

<div class="flex h-lvh w-lvw items-center justify-center">
	{@render children()}
</div>
