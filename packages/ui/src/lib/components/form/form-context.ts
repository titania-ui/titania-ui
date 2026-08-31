import { Context } from '#lib/utils/context.ts';
import type { ReadableBox, WritableBox } from 'svelte-toolbelt';
import type { SuperForm } from 'sveltekit-superforms';

export interface FormCtx {
	readonly id: ReadableBox<string>;
	readonly variants: ReadableBox<Record<string, unknown>>;

	readonly form: ReadableBox<SuperForm<Record<string, unknown>>>;
	readonly constraints: ReadableBox<Record<string, unknown>>;
	readonly errors: ReadableBox<Record<string, unknown>>;
}

export const formCtx = new Context<FormCtx>('Form.Root');

export interface FieldsetCtx {
	readonly legendId: WritableBox<string | undefined>;
}

export const fieldsetCtx = new Context<FieldsetCtx>('Form.Fieldset');
