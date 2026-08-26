/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'svelte';

export function concrete<TProps extends Record<string, any>>(
	component: unknown
): Component<TProps, Record<string, never>, 'ref'> {
	return component as Component<TProps, Record<string, never>, 'ref'>;
}

export type Concrete<TProps extends Record<string, any>> = Component<
	TProps,
	Record<string, never>,
	'ref'
>;
