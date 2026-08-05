<script lang="ts">
	import { cx } from 'tailwind-variants/lite';
	import type { RootProps } from './link.ts';
	import { useHover } from '../../index.ts';

	let {
		disabled = false,
		//
		ref = $bindable(null),
		class: className = undefined,
		children,
		...props
	}: RootProps = $props();

	const classValue = $derived(cx('talink', className, disabled && 'talink--disabled'));
</script>

<a
	bind:this={ref}
	aria-disabled={disabled ? 'true' : undefined}
	{...props}
	class={classValue}
	{@attach useHover({ isDisabled: disabled })}
>
	{@render children?.()}
</a>
