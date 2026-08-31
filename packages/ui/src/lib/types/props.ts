/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, ComponentProps, Snippet } from 'svelte';
import type { ClassValue, HTMLAttributes, SvelteHTMLElements } from 'svelte/eleme.js';
import type { Pretty } from './utils.js';

/* Every conditional below uses `[T] extends [X]` instead of a bare
   `T extends X ? ... : ...`, because the bare form distributes over
   the `As | undefined` constraint and blows up into one attribute
   object per element tag. That's what "union type too complex" means. */

// keyof SvelteHTMLElements includes an index signature for custom
// elements, which collapses to string | number and breaks narrowing.
export type ElementTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
export type As = ElementTag | Component<any, any, any>;

/** Attributes of a tag, or props of a component. */
export type AttrsOf<T extends As> = [T] extends [ElementTag]
	? SvelteHTMLElements[T & keyof SvelteHTMLElements]
	: [T] extends [Component<any, any, any>]
		? ComponentProps<T>
		: Record<string, any>;

/** DOM node behind `as`. */
export type RefOf<T> = [T] extends [keyof HTMLElementTagNameMap]
	? HTMLElementTagNameMap[T & keyof HTMLElementTagNameMap]
	: [T] extends [keyof SVGElementTagNameMap]
		? SVGElementTagNameMap[T & keyof SVGElementTagNameMap]
		: [T] extends [Component<infer P, any, any>]
			? P extends { ref?: infer R }
				? NonNullable<R>
				: HTMLElement
			: HTMLElement;

/** What `child` receives as `props`. Not wrapped in Pretty, or it'd
 *  materialise ~300 attribute keys per union branch. */
export type SpreadOf<T extends As> =
	AttrsOf<T> extends infer A
		? Omit<A, keyof HTMLAttributes<any> | 'children' | 'ref' | 'class'> &
				HTMLAttributes<any> & { class?: string }
		: never;

type Reserved = 'as' | 'child' | 'children' | 'ref' | 'class';

export type Config = {
	tag: As;
	own?: Record<string, any>;
	theme?: Record<string, any>;
	state?: Record<string, any>;
	child?: boolean;
	as?: boolean;
	/** e.g. `{ href: 'a' }`: passing `href` defaults the tag to `<a>`.
	 *  Must also be declared in `own`. Only one key. */
	when?: Record<string, As>;
};

type Own<C> = C extends { own: infer O extends Record<string, any> } ? O : {};
type Theme<C> = C extends { theme: infer T extends Record<string, any> } ? T : {};
type State<C> = C extends { state: infer S extends Record<string, any> } ? S : void;
type HasChild<C> = C extends { child: true } ? true : false;
type HasAs<C> = C extends { as: false } ? false : true;

export type ChildArg<TAs extends As, TState> = [TState] extends [void]
	? { props: SpreadOf<TAs> }
	: Pretty<{ props: SpreadOf<TAs> } & TState>;

// children/child stay non-exclusive in the types (a union here doubles
// every branch); `child` just wins at runtime when both are passed.
type Content<TAs extends As, TState, TChild extends boolean> = {
	children?: [TState] extends [void] ? Snippet : Snippet<[Pretty<TState>]>;
} & ([TChild] extends [true] ? { child?: Snippet<[ChildArg<TAs, TState>]> } : { child?: never });

// html attrs <- own props <- theme props
type Build<TTag extends As, TOwn, C extends Config, TAsProp> = Omit<
	AttrsOf<TTag>,
	Reserved | keyof TOwn | keyof Theme<C>
> &
	Pretty<
		Omit<TOwn, keyof Theme<C>> &
			Theme<C> & {
				class?: ClassValue;
				id?: string;
				ref?: RefOf<TTag> | null;
			} & ([HasAs<C>] extends [true] ? { as?: TAsProp } : {})
	>;

// `when` used to produce Build<'button',...> | Build<'a',...>, and a
// union here is fatal once Omit destructures it. So the switching prop
// gets its own generic instead: passing `href` infers it, and the tag
// follows from that, no union needed.

type WhenKey<C> = C extends { when: infer W } ? keyof W & string : never;

type WhenTag<C> = C extends { when: infer W }
	? W[keyof W] extends infer T
		? T extends As
			? T
			: never
		: never
	: never;

type ResolvedTag<TAs, C extends Config, TWhen> = [TAs] extends [undefined]
	? [TWhen] extends [undefined]
		? C['tag']
		: WhenTag<C>
	: TAs & As;

// The tag snippets are typed against: always the declared default, not
// the resolved one. Keeping it a single tag (not TAs/TWhen, not a union
// of `when` targets) avoids re-triggering the union blowup inside `child`.
type ContentTags<C extends Config> = C['tag'];

type ResolvedOwn<C extends Config, TWhen> = [WhenKey<C>] extends [never]
	? Own<C>
	: Omit<Own<C>, WhenKey<C>> & { [P in WhenKey<C>]?: TWhen };

/**
 * ```ts
 * export type ButtonProps<
 *   TAs extends As | undefined = undefined,
 *   THref extends string | undefined = undefined
 * > = Props<TAs, ButtonCfg, THref>;
 * ```
 */
export type Props<TAs extends As | undefined, C extends Config, TWhen = undefined> = Build<
	ResolvedTag<TAs, C, TWhen>,
	ResolvedOwn<C, TWhen>,
	C,
	TAs
> &
	Content<ContentTags<C>, State<C>, HasChild<C>>;

// Use this to cast at the `{@render child(...)}` call site.
// `Parameters<NonNullable<typeof child>>[0]` looks equivalent but
// re-enters the deferred prop type and blows the union limit.
export type ChildArgOf<C extends Config> = ChildArg<ContentTags<C>, State<C>>;

/**
 * ```ts
 * let { as, padded, ...rest }: CardProps<TAs> & Internal<Cfg> = $props();
 * ```
 */
export type Internal<C extends Config> = Own<C> &
	Theme<C> & {
		as?: As;
		class?: ClassValue;
		ref?: Element | null;
		children?: Snippet<any>;
		child?: Snippet<any>;
	};

// Escape hatch for when a component still trips the union limit, usually
// a `when` with multiple keys plus `child: true`.
export type Loose<C extends Config> = Internal<C> & Record<string, any> & { ref?: Element | null };

/**
 * ```ts
 * export type ButtonCfg = Define<{
 *   tag: 'button';
 *   when: { href: 'a' };
 *   own: { href?: string };
 * }>;
 * ```
 */
export type Define<C> = C extends Config
	? Exclude<keyof C, keyof Config> extends never
		? C extends { when: infer W }
			? keyof W extends keyof Own<C>
				? C
				: {
						ERROR: `every \`when\` key must also be declared in \`own\`: ${Exclude<
							keyof W,
							keyof Own<C>
						> &
							string}`;
					}
			: C
		: {
				ERROR: `unknown config key: ${Exclude<keyof C, keyof Config> & string}`;
			}
	: { ERROR: 'config must have a `tag`' };

export type ThemeOf<T> = T extends (props?: infer P) => any
	? P extends undefined
		? {}
		: Pretty<Omit<NonNullable<P>, 'class' | 'className'>>
	: {};

export type StateOf<C extends Config> = [State<C>] extends [void]
	? Record<string, never>
	: Pretty<State<C> & {}>;

export type TagsOf<C extends Config> = C extends {
	when: infer W extends Record<string, As>;
}
	? C['tag'] | (W[keyof W] & As)
	: C['tag'];

export type ToolingProps<C extends Config> = Partial<
	Own<C> & Theme<C> & { class: ClassValue; as: As }
> &
	Record<string, any>;
