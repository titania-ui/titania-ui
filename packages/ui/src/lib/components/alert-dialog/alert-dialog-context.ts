import { Context } from '#lib/utils/context.js';
import type { Status } from './index.js';
import type { ReadableBox } from 'svelte-toolbelt';

export interface AlertDialogCtx {
	readonly open: ReadableBox<boolean>;
	readonly status: ReadableBox<Status>;
	/** Visually hidden status word read with the title (empty for neutral statuses). */
	readonly statusLabel: ReadableBox<string>;
	/** True while an async `onconfirm` is running. */
	readonly pending: ReadableBox<boolean>;
	/** Runs `onconfirm`, then closes the dialog once it settles successfully. */
	readonly confirm: () => Promise<void>;
}

export const alertDialogCtx = new Context<AlertDialogCtx>('AlertDialog.Root');
