<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { splitVariants } from '#lib/utils/splitVariants.js';
	import { theme as avatarTheme } from '../../avatar/theme.js';
	import { type RootCfg, type RootProps, avatarGroupCtx, theme } from '../index.js';
	import AvatarGroupCount from './avatar-group-count.svelte';
	import { boxWith } from 'svelte-toolbelt';

	let {
		max,
		//
		as: Tag = 'div',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child,
		...rest
	}: RootProps<TAs> = $props();

	let split = $derived(splitVariants(avatarTheme, rest));

	const cls = $derived(theme().root({ class: className } as never));

	let keys = $state<string[]>([]);

	const overflow = $derived(max === undefined ? 0 : Math.max(0, keys.length - max));

	avatarGroupCtx.set({
		variants: boxWith(() => ({})),
		avatarVariants: boxWith(() => split.variants),
		max: boxWith(() => max),
		register(key) {
			keys.push(key);
			return () => {
				const i = keys.indexOf(key);
				if (i >= 0) keys.splice(i, 1);
			};
		},
		indexOf: (key) => keys.indexOf(key)
	});

	const attrs = $derived({
		'data-slot': 'avatar-group',
		...split.attrs,
		class: cls
	});
</script>

{#snippet body()}
	{@render children?.()}
	{#if overflow > 0}
		<AvatarGroupCount count={overflow} />
	{/if}
{/snippet}

<Polymorphic
	tag={Tag}
	{attrs}
	bind:ref
	{child}
	childArg={{ props: attrs } as ChildArgOf<RootCfg>}
	children={body}
/>
