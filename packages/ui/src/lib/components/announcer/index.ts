import { announce } from '#lib/helpers/announcer.js';
import { default as Root } from './components/announcer-root.svelte';

export type { AnnounceOptions, Politeness } from '#lib/helpers/announcer.js';

const EXPORT: typeof Root & {
	Root: typeof Root;
	announce: typeof announce;
} = Object.assign(Root, { Root, announce });
export default EXPORT;
