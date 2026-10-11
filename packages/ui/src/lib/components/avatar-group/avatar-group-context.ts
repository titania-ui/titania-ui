import { Context } from '#lib/utils/context.js';
import type { ReadableBox } from 'svelte-toolbelt';

export interface AvatarGroupCtx {
	readonly variants: ReadableBox<Record<string, unknown>>;
	readonly avatarVariants: ReadableBox<Record<string, unknown>>;
	readonly max: ReadableBox<number | undefined>;
	register(key: string): () => void;
	indexOf(key: string): number;
}

export const avatarGroupCtx = new Context<AvatarGroupCtx>('AvatarGroup.Root');
