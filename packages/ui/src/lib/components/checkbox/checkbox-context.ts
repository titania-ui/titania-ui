import { Context } from '#lib/utils/context.js';
import type { ReadableBox } from 'svelte-toolbelt';

export interface CheckboxCtx {
	readonly variants: ReadableBox<Record<string, unknown>>;
	readonly checked: ReadableBox<boolean>;
	readonly indeterminate: ReadableBox<boolean>;
}

export const checkboxCtx = new Context<CheckboxCtx>('Checkbox.Root');
