<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Field from '#lib/components/field/index.js';
	import type { As } from '#lib/types/props.js';
	import { type RootProps, theme } from '../index.js';
	import type { ClassValue } from 'svelte/elements';
	import { cx } from 'tailwind-variants/lite';

	let {
		//
		class: className = undefined,
		ref = $bindable(null),
		...rest
	}: Omit<RootProps<TAs>, 'ref' | 'class'> & { ref?: unknown; class?: ClassValue } = $props();

	const cls = $derived(cx(theme(), className));
</script>

<Field bind:ref={ref as never} class={cls} {...rest as Record<string, unknown>} />
