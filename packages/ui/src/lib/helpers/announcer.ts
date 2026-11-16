export type Politeness = 'polite' | 'assertive';

export type AnnounceOptions = {
	politeness?: Politeness;
	/** Skip the message while the page is still hydrating (content that was already there on load). */
	afterLoad?: boolean;
};

type Region = {
	el: HTMLElement | null;
	pending: string[];
	flush?: ReturnType<typeof setTimeout>;
	clear?: ReturnType<typeof setTimeout>;
};

// Delay between emptying the region and writing the text, so identical consecutive messages are re-announced.
const WRITE_DELAY = 100;
// Remove the text again so it isn't found by virtual cursor browsing.
const CLEAR_DELAY = 7000;

const regions: Record<Politeness, Region> = {
	polite: { el: null, pending: [] },
	assertive: { el: null, pending: [] }
};

let ready = false;

function flush(region: Region) {
	if (!region.el || region.flush || region.pending.length === 0) return;
	region.el.textContent = '';
	region.flush = setTimeout(() => {
		region.flush = undefined;
		if (!region.el) return;
		region.el.textContent = region.pending.splice(0).join('. ');
		clearTimeout(region.clear);
		region.clear = setTimeout(() => {
			if (region.el) region.el.textContent = '';
		}, CLEAR_DELAY);
	}, WRITE_DELAY);
}

/** Called by `<Announcer>` once its two containers are in the DOM. */
export function registerRegion(politeness: Politeness, el: HTMLElement): () => void {
	const region = regions[politeness];
	region.el = el;
	flush(region);
	return () => {
		if (region.el === el) region.el = null;
	};
}

/** Called by `<Announcer>` after the first render, so `afterLoad` messages can tell hydration apart. */
export function markReady() {
	ready = true;
	return () => {
		ready = false;
	};
}

/**
 * Writes a message into the document-wide live region rendered by `<Announcer>`.
 * Messages arriving close together are joined into a single announcement.
 */
export function announce(message: string, options: AnnounceOptions = {}) {
	if (typeof document === 'undefined') return;
	const { politeness = 'polite', afterLoad = false } = options;
	if (afterLoad && !ready) return;
	const text = message.replace(/\s+/g, ' ').trim();
	if (!text) return;

	const region = regions[politeness];
	if (!region.el && import.meta.env?.DEV && ready) {
		console.warn('announce(): no <Announcer /> is mounted, the message will not be spoken:', text);
	}
	if (!region.pending.includes(text)) region.pending.push(text);
	flush(region);
}
