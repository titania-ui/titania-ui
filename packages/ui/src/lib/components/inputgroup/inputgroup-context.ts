import type { ReadableBox } from 'svelte-toolbelt';
import { Context } from '#lib/utils/context.ts';

export interface InputGroupCtx {
	readonly variants: ReadableBox<Record<string, unknown>>;
}

export const inputGroupCtx = new Context<InputGroupCtx>('InputGroup.Root');
