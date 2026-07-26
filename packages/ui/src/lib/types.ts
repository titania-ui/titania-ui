import type { ClassValue } from 'tailwind-variants';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { Component, ComponentProps, Snippet } from 'svelte';

/**
 * Resolves an HTML tag name (e.g. "div", "nav", "svg") to its corresponding
 * DOM element interface.
 *
 * - "svg" is special-cased since it isn't a key of `HTMLElementTagNameMap`.
 * - Unknown tags fall back to `HTMLElement` instead of erroring.
 * - Left as a "naked" conditional so that when `Tag` is a union
 *   (e.g. "a" | "button"), TypeScript *distributes* over it —
 *   `HTMLAnchorElement | HTMLButtonElement`, not one merged type.
 */
export type TagNameToElement<Tag extends string> = Tag extends 'svg'
	? SVGSVGElement
	: Tag extends keyof HTMLElementTagNameMap
		? HTMLElementTagNameMap[Tag]
		: HTMLElement;

/**
 * The absolute minimum every component gets: a typed `ref` and a `class`
 * prop. Deliberately does NOT include `as` — that's opt-in, only on
 * `SwitchableTagComponentProps`.
 *
 * @template Tag - HTML tag this component renders as. Used to type `ref`.
 */
export type SharedBaseTypes<Tag extends string & keyof SvelteHTMLElements> = {
	/** Ref to the underlying DOM element, typed to match `Tag`. */
	ref?: TagNameToElement<Tag> | null;

	/**
	 * CSS classes to apply to the element.
	 * Accepts any value supported by `clsx`: strings, arrays, objects, falsy values.
	 * @see https://github.com/lukeed/clsx
	 */
	class?: ClassValue;
};

/** Build the prop object for one concrete tag. */
type PropsForTag<
	ActualTag extends string & keyof SvelteHTMLElements,
	OwnProps extends Record<string, unknown>,
	VariantProps extends Record<string, unknown>
> = SharedBaseTypes<ActualTag> &
	OwnProps &
	// CVA props, minus anything OwnProps already defines (OwnProps wins)
	Omit<VariantProps, keyof OwnProps> &
	// native attributes for the resolved tag, minus what we've already typed
	Omit<
		SvelteHTMLElements[ActualTag],
		keyof OwnProps | keyof VariantProps | keyof SharedBaseTypes<ActualTag>
	>;

/**
 * Props for a component that CAN switch its rendered tag via `as` e.g. a
 * `Heading` that renders `h1`–`h6`, or a `Button` that can render as `a`.
 * `ref` and `as` are both typed to match `Tag`.
 *
 * Only components that genuinely need tag-switching should use this.
 * Everything else: `FixedTagComponentProps`.
 *
 * @template Tag          - HTML tag string, can be a union (e.g. "a" | "button")
 * @template OwnProps     - Your custom prop overrides
 * @template VariantProps - Optional tailwind-variants props
 *
 * @example
 * type HeadingProps = SwitchableTagComponentProps<'h1'>;
 * // as?: 'h1' | 'h2' | 'h3', ref matches whichever tag is actually passed.
 */
export type SwitchableTagComponentProps<
	Tag extends string & keyof SvelteHTMLElements,
	OwnProps extends Record<string, unknown> = {},
	VariantProps extends Record<string, unknown> = {}
> =
	// Case 1: `as` omitted
	| ({ as?: Tag; render?: Snippet<[{ props: Record<string, unknown> }]> } & PropsForTag<
			Tag,
			OwnProps,
			VariantProps
	  >)
	// Case 2: `as` set to some other tag
	| {
			[ActualTag in Exclude<string & keyof SvelteHTMLElements, Tag>]: {
				as: ActualTag;
			} & PropsForTag<ActualTag, OwnProps, VariantProps>;
	  }[Exclude<string & keyof SvelteHTMLElements, Tag>];

export type FixedTagComponentProps<
	Tag extends string & keyof SvelteHTMLElements,
	OwnProps extends Record<string, unknown> = {},
	VariantProps extends Record<string, unknown> = {}
> = PropsForTag<Tag, OwnProps, VariantProps>;

/**
 * Forces TypeScript to display a type as a flat object literal in tooltips/
 * errors, instead of the raw `A & B & Omit<...>` intersection. Cosmetic only.
 */
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
