import { getContext, hasContext, setContext } from 'svelte';

export class Context<TContext> {
	readonly #name: string;
	readonly #key: symbol;

	constructor(name: string) {
		this.#name = name;
		this.#key = Symbol(name);
	}

	get key(): symbol {
		return this.#key;
	}

	exists(): boolean {
		return hasContext(this.#key);
	}

	get(): TContext {
		const context = getContext<TContext | undefined>(this.#key);
		if (context === undefined) {
			throw new Error(`Context "${this.#name}" not found`);
		}
		return context;
	}

	getOr<TFallback>(fallback: TFallback): TContext | TFallback {
		const context = getContext<TContext | undefined>(this.#key);
		if (context === undefined) {
			return fallback;
		}
		return context;
	}

	set(context: TContext): TContext {
		return setContext(this.#key, context);
	}
}
