<script lang="ts">
	import { useFocusRing } from '#lib/helpers/useFocusRing.js';
	import { toggleCtx } from '#lib/utils/toggleContext.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	/**
	 * The native input behind `Checkbox` / `Switch`. Rendered inside their `Control`
	 * and stretched over it, so clicking the control toggles natively.
	 */
	let {
		type,
		role = undefined,
		class: className
	}: Pick<HTMLInputAttributes, 'type' | 'role' | 'class'> = $props();

	const ctx = toggleCtx.get();
</script>

<input
	bind:this={() => ctx.ref.current, (v) => (ctx.ref.current = v)}
	{...ctx.inputAttrs.current}
	{type}
	{role}
	class={className}
	checked={ctx.checked.current}
	onchange={ctx.onchange}
	{@attach useFocusRing()}
/>
