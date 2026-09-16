import { Context } from '#lib/utils/context.js';
import type { ReadableBox, WritableBox } from 'svelte-toolbelt';

export interface FieldCtx {
	readonly name: ReadableBox<string | undefined>;
	readonly variants: ReadableBox<Record<string, unknown>>;

	readonly auto: ReadableBox<boolean>;
	readonly required: ReadableBox<boolean>;
	readonly disabled: ReadableBox<boolean>;
	readonly errors: WritableBox<string[]>;
	readonly constraints: ReadableBox<Record<string, unknown>>;

	readonly descriptionId: WritableBox<string | undefined>;
	readonly labelId: WritableBox<string | undefined>;
}

export const fieldCtx = new Context<FieldCtx>('Form.Field');
