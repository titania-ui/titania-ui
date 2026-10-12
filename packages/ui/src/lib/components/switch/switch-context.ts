import { Context } from '#lib/utils/context.js';
import type { ReadableBox } from 'svelte-toolbelt';

export interface SwitchCtx {
	readonly variants: ReadableBox<Record<string, unknown>>;
	readonly checked: ReadableBox<boolean>;
}

export const switchCtx = new Context<SwitchCtx>('Switch.Root');
