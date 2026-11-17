<script lang="ts">
	import { dropdownCtx } from '../dropdown-context.js';
	import type { RootProps } from '../index.js';
	import { box, boxWith } from 'svelte-toolbelt';

	const uid = $props.id();

	let { open = $bindable(false), placement = 'bottom-start', children }: RootProps = $props();

	dropdownCtx.set({
		open: boxWith(
			() => open,
			(v) => (open = v)
		),
		placement: () => placement,
		triggerId: box(`${uid}-trigger`),
		contentId: box(`${uid}-content`),
		anchorName: `--tadropdown-${uid.replace(/[^\w-]/g, '_')}`
	});
</script>

{@render children?.({ open })}
