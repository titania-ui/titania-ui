import type { ReadableBox } from 'svelte-toolbelt';
import { Context } from '#lib/utils/context.js';
import type { theme } from './theme.ts';

export interface SidebarCtx {
	readonly slots: ReadableBox<ReturnType<typeof theme>>;
}

export const sidebarCtx = new Context<SidebarCtx>('Sidebar.Root');
