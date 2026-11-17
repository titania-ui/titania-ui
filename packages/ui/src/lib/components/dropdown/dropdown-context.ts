import { Context } from '#lib/utils/context.js';
import type { WritableBox } from 'svelte-toolbelt';

export interface DropdownCtx {
	readonly open: WritableBox<boolean>;
	readonly placement: () => string;
	readonly triggerId: WritableBox<string>;
	readonly contentId: WritableBox<string>;
	/** Dashed ident linking the trigger (`anchor-name`) to the content (`position-anchor`). */
	readonly anchorName: string;
}

export const dropdownCtx = new Context<DropdownCtx>('Dropdown.Root');

/** Marker set by `Dropdown.List` so items and dividers render as `<li>`. */
export const dropdownListCtx = new Context<true>('Dropdown.List');
