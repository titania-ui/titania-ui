<script lang="ts">
	import { cx } from 'tailwind-variants/lite';
	import type { RootProps } from './strong.ts';

	let {
		//
		ref = $bindable(null),
		class: className = undefined,
		children,
		...props
	}: RootProps = $props();

	const classValue = $derived(cx('tastrong', className));
</script>

<strong bind:this={ref} {...props} class={classValue}>
	{@render children?.()}
</strong>
