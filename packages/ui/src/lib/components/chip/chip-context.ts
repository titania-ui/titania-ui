import type { ReadableBox, WritableBox } from 'svelte-toolbelt';
import { Context } from '#lib/utils/context.js';

export interface ChipCtx {
	readonly id: ReadableBox<string>;
	readonly labelId: ReadableBox<string | undefined>;
	readonly variants: ReadableBox<Record<string, unknown>>;
	readonly dismissed: WritableBox<boolean>;
}

export const chipCtx = new Context<ChipCtx>('Chip.Root');
