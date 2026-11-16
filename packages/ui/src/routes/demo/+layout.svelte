<script lang="ts">
	import { Announcer } from '#lib';
	import '../../lib/theme/flowbite/index.css';

	const { children } = $props();
</script>

<Announcer />
{@render children()}
