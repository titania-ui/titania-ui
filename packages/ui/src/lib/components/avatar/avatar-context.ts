import { Context } from '#lib/utils/context.js';
import type { AvatarState } from './avatar-state.svelte.js';
import type { ReadableBox } from 'svelte-toolbelt';

export interface AvatarCtx {
	readonly variants: ReadableBox<Record<string, unknown>>;
	readonly state: AvatarState;
}

export const avatarCtx = new Context<AvatarCtx>('Avatar.Root');
