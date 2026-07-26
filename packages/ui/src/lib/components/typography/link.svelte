<script lang="ts">
	import { cx } from 'tailwind-variants/lite';
	import type { RootProps } from './link.ts';

	let {
		//
		ref = $bindable(null),
		class: className = undefined,
		children,
		...props
	}: RootProps = $props();

	const classValue = $derived(cx('talink', className));
</script>

<a bind:this={ref} {...props} class={classValue}>
	{@render children?.()}
</a>
