<script lang="ts" generics="TChildArg = unknown">
	import type { As } from '#lib/types/props.js';
	import type { Snippet } from 'svelte';

	/**
	 * The polymorphic-tag render block every leaf component ends with, in one
	 * place. Does the three-way branch once:
	 *
	 * 1. `child` present  → render-prop wins, nothing else renders.
	 * 2. `tag` is a string → `<svelte:element>` with a bound `ref`.
	 * 3. `tag` is a component → `<Tag>` with a bound `ref`.
	 *
	 * `children` is the body: rendered inside the string element, and forwarded
	 * as the `children` prop when `tag` is a component (so a component `as=`
	 * target that relies on `children` being `undefined` still behaves).
	 *
	 * ```svelte
	 * <Polymorphic
	 *   tag={Tag}
	 *   {attrs}
	 *   bind:ref
	 *   {child}
	 *   childArg={{ props: attrs } as ChildArgOf<TitleCfg>}
	 *   {children}
	 * />
	 * ```
	 */
	let {
		tag: Tag,
		attrs,
		ref = $bindable(null),
		child,
		childArg,
		children
	}: {
		/** Resolved element tag or component. */
		tag: As;
		/** Everything to spread onto the element / component. */
		attrs: Record<string, unknown>;
		/** DOM node (string tag) or component `ref` export. Bindable. */
		ref?: unknown;
		/** Render-prop escape hatch. When present it wins: nothing else renders. */
		child?: Snippet<[TChildArg]>;
		/** Argument passed to `child`. */
		childArg?: TChildArg;
		/** Body content. */
		children?: Snippet;
	} = $props();
</script>

{#if child}
	{@render child(childArg as TChildArg)}
{:else if typeof Tag === 'string'}
	<svelte:element this={Tag} bind:this={() => ref, (v) => (ref = v as never)} {...attrs}>
		{@render children?.()}
	</svelte:element>
{:else}
	<Tag bind:ref={() => ref as never, (v) => (ref = v as never)} {...attrs} {children} />
{/if}
