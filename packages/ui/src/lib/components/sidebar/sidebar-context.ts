import type { ReadableBox } from 'svelte-toolbelt';
import { Context } from '../../utils/index.ts';
import type { theme } from './theme.ts';

export interface SidebarCtx {
	readonly slots: ReadableBox<ReturnType<typeof theme>>;
}

export const sidebarCtx = new Context<SidebarCtx>('Sidebar.Root');
