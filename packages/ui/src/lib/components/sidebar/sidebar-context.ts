import type { ReadableBox } from 'svelte-toolbelt';
import { Context } from '#lib/utils/context.js';

export interface SidebarCtx {
	readonly variants: ReadableBox<Record<string, unknown>>;
}

export const sidebarCtx = new Context<SidebarCtx>('Sidebar.Root');
