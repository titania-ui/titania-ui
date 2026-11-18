<script lang="ts" generics="TAs extends As | undefined = undefined">
	import Polymorphic from '#lib/helpers/polymorphic.svelte';
	import type { As, ChildArgOf } from '#lib/types/props.js';
	import { type DescriptionCfg, type DescriptionProps, theme } from '../index.js';
	import { AlertDialog as Primitive } from 'bits-ui';
	import { mergeProps } from 'svelte-toolbelt';

	let {
		//
		as: Tag = 'p',
		class: className = undefined,
		ref = $bindable(null),
		children,
		child: userChild,
		...rest
	}: DescriptionProps<TAs> = $props();

	function attrsFor(props: Record<string, unknown>) {
		return {
			'data-slot': 'alert-dialog-description',
			...mergeProps(rest, props),
			class: theme().description({ class: className } as never)
		};
	}
</script>

<!-- bits-ui links the description to the dialog via aria-describedby -->
<Primitive.Description>
	{#snippet child({ props })}
		{@const attrs = attrsFor(props)}
		<Polymorphic
			tag={Tag}
			{attrs}
			bind:ref
			child={userChild}
			childArg={{ props: attrs } as ChildArgOf<DescriptionCfg>}
			{children}
		/>
	{/snippet}
</Primitive.Description>
