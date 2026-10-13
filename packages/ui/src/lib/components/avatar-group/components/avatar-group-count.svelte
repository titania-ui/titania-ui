<script lang="ts">
	import Avatar from '#lib/components/avatar/index.js';
	import { avatarGroupCtx } from '../avatar-group-context.js';
	import { theme } from '../index.js';

	let { count }: { count: number } = $props();

	const groupCtx = avatarGroupCtx.get();

	avatarGroupCtx.set({
		...groupCtx,
		max: { current: undefined } as never,
		register: () => () => {},
		indexOf: () => -1
	});
</script>

<Avatar data-slot="avatar-group-count" class={theme().count()} alt="{count} more">
	<Avatar.Fallback>+{count}</Avatar.Fallback>
</Avatar>
