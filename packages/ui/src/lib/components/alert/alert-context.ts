import type { ReadableBox, WritableBox } from 'svelte-toolbelt';
import { Context } from '../../utils/index.ts';

export interface AlertCtx {
	readonly id: ReadableBox<string>;
	readonly variants: ReadableBox<Record<string, unknown>>;
	readonly titleId: WritableBox<string | undefined>;
	readonly descriptionId: WritableBox<string | undefined>;
	readonly dismissed: WritableBox<boolean>;
}

export const alertCtx = new Context<AlertCtx>('Alert.Root');
