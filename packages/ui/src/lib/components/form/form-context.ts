import { Context } from '#lib/utils/context.js';
import type { ReadableBox, WritableBox } from 'svelte-toolbelt';
import type { SuperForm } from 'sveltekit-superforms';

export interface FormCtx {
	readonly id: ReadableBox<string>;
	readonly variants: ReadableBox<Record<string, unknown>>;

	readonly form: ReadableBox<SuperForm<Record<string, unknown>>>;
	readonly constraints: ReadableBox<Record<string, unknown>>;
	readonly errors: ReadableBox<Record<string, unknown>>;
	/** True from a submit until its errors were announced; field-level announcements stay quiet meanwhile. */
	readonly submitPending: ReadableBox<boolean>;
}

export const formCtx = new Context<FormCtx>('Form.Root');

export interface FieldsetCtx {
	readonly legendId: WritableBox<string | undefined>;
}

export const fieldsetCtx = new Context<FieldsetCtx>('Form.Fieldset');
