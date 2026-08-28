import { tv } from 'tailwind-variants/lite';
import type { As, Define, Props, ThemeOf } from '#lib/types/props.ts';

export const theme = tv({
	base: 'taheading',
	variants: {
		level: {
			1: 'taheading--level-1',
			2: 'taheading--level-2',
			3: 'taheading--level-3',
			4: 'taheading--level-4',
			5: 'taheading--level-5',
			6: 'taheading--level-6'
		}
	}
});

// Root
export type RootCfg = Define<{
	tag: 'h1';
	theme: ThemeOf<typeof theme>;
	own: {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	};
	child: true;
}>;
export type RootProps<TAs extends As | undefined = undefined> = Props<TAs, RootCfg>;
import { default as Root } from './heading.svelte';

const EXPORT: typeof Root & {
	Root: typeof Root;
	theme: typeof theme;
} = Object.assign(Root, {
	Root,
	theme
});
export default EXPORT;
