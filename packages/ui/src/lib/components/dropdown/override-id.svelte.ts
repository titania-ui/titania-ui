import type { WritableBox } from 'svelte-toolbelt';

/**
 * Lets a part replace one of the root's generated ids (`triggerId`, `contentId`)
 * with its own `id` prop, restoring the generated one on teardown.
 */
export function overrideId(target: WritableBox<string>, id: () => string | undefined) {
	$effect.pre(() => {
		const own = id();
		if (!own) return;
		const prev = target.current;
		target.current = own;
		return () => {
			if (target.current === own) target.current = prev;
		};
	});
}
