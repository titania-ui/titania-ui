import type { ReadableBox, WritableBox } from 'svelte-toolbelt';
import { Context } from '#lib/utils/context.js';

export interface ChipCtx {
	readonly id: ReadableBox<string>;
	readonly dismissed: WritableBox<boolean>;
}

export const chipCtx = new Context<ChipCtx>('Chip.Root');
