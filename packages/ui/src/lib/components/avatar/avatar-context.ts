import { Context } from '#lib/utils/context.js';
import type { ReadableBox } from 'svelte-toolbelt';

export interface AvatarCtx {
	readonly variants: ReadableBox<Record<string, unknown>>;
}

export const avatarCtx = new Context<AvatarCtx>('Avatar.Root');
