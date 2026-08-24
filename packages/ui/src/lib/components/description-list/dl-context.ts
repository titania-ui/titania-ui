import type { ReadableBox } from 'svelte-toolbelt';
import { Context } from '#lib/utils/context.js';
import type { theme } from './theme.ts';

export interface DescriptionListCtx {
	readonly slots: ReadableBox<ReturnType<typeof theme>>;
}

export const descriptionListCtx = new Context<DescriptionListCtx>('DescriptionList.Root');
