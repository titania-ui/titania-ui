<script lang="ts">
	import { locales, localizeHref } from '#lib/paraglide/runtime.js';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Path } from '$app/types';
</script>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>
