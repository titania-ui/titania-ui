import type { WritableBox } from 'svelte-toolbelt';

export function registerId(box: WritableBox<string | undefined>, id: string): () => void {
	box.current = id;
	return () => {
		if (box.current === id) box.current = undefined;
	};
}
