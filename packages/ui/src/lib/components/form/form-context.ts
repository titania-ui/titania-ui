import type { ReadableBox, WritableBox } from 'svelte-toolbelt';
import { Context } from '../../utils/index.ts';
import type { rootTheme, fieldTheme } from './theme.ts';
import type { SuperValidated } from 'sveltekit-superforms';

export interface FormCtx {
	readonly id: ReadableBox<string>;
	readonly slots: ReadableBox<ReturnType<typeof rootTheme>>;
	readonly attrs: ReadableBox<Record<string, unknown>>;

	readonly form: ReadableBox<SuperValidated<Record<string, unknown>>>;
	readonly constraints: ReadableBox<Record<string, unknown>>;
	readonly errors: ReadableBox<Record<string, unknown>>;
}

export const formCtx = new Context<FormCtx>('Form.Root');

export interface FieldCtx {
	readonly name: ReadableBox<string>;
	readonly slots: ReadableBox<ReturnType<typeof fieldTheme>>;
	readonly attrs: ReadableBox<Record<string, unknown>>;

	readonly labelId: WritableBox<string | undefined>;
	readonly inputId: WritableBox<string | undefined>;

	readonly auto: ReadableBox<boolean>;
	readonly required: ReadableBox<boolean>;
	readonly disabled: ReadableBox<boolean>;
	readonly errors: ReadableBox<string[]>;
	readonly constraints: ReadableBox<Record<string, unknown>>;
}

export const fieldCtx = new Context<FieldCtx>('Form.Field');
