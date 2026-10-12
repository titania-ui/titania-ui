import { Context } from '#lib/utils/context.js';
import type { ReadableBox, WritableBox } from 'svelte-toolbelt';

/**
 * Shared by checkbox-like controls (`Checkbox`, `Switch`). The root owns the
 * state, `Control` renders the native input, `Content` / `Label` / `Text`
 * register themselves so the input gets labelled and described.
 */
export interface ToggleCtx {
	readonly inputId: ReadableBox<string>;
	readonly inputAttrs: ReadableBox<Record<string, unknown>>;
	readonly checked: ReadableBox<boolean>;
	readonly disabled: ReadableBox<boolean>;
	readonly ref: WritableBox<HTMLInputElement | null>;
	readonly onchange: (e: Event & { currentTarget: HTMLInputElement }) => void;

	readonly labelId: WritableBox<string | undefined>;
	readonly descriptionId: WritableBox<string | undefined>;
	readonly contentId: WritableBox<string | undefined>;
}

export const toggleCtx = new Context<ToggleCtx>('Toggle.Root');
