export type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

export class AvatarState {
	status = $state<ImageStatus>('idle');
	hasImage = $state(false);
	delayElapsed = $state(false);

	readonly #delay: () => number;

	constructor(delay: () => number) {
		this.#delay = delay;
	}

	fallbackVisible = $derived(
		this.status !== 'loaded' && (!this.hasImage || this.status === 'error' || this.delayElapsed)
	);

	registerImage(): () => void {
		this.hasImage = true;
		return () => {
			this.hasImage = false;
			this.status = 'idle';
		};
	}

	watchDelay(): void {
		$effect(() => {
			if (this.status !== 'loading') {
				this.delayElapsed = false;
				return;
			}
			const timeout = setTimeout(() => (this.delayElapsed = true), this.#delay());
			return () => clearTimeout(timeout);
		});
	}

	load(src: string | null | undefined, opts: Partial<HTMLImageElement> = {}): () => void {
		if (!src) {
			this.status = 'error';
			return () => {};
		}
		this.status = 'loading';
		const img = new Image();
		if (opts.crossOrigin) img.crossOrigin = opts.crossOrigin;
		if (opts.referrerPolicy) img.referrerPolicy = opts.referrerPolicy;
		img.onload = () => (this.status = 'loaded');
		img.onerror = () => (this.status = 'error');
		img.src = src;
		return () => {
			img.onload = img.onerror = null;
		};
	}
}
