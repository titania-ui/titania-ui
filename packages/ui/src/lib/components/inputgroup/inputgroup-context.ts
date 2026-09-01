import { Context } from '#lib/utils/context.js';
import type { ReadableBox } from 'svelte-toolbelt';

export interface InputGroupCtx {
	readonly variants: ReadableBox<Record<string, unknown>>;
}

export const inputGroupCtx = new Context<InputGroupCtx>('InputGroup.Root');
