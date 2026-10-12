import { fieldCtx } from '#lib/components/field/field-context.js';
import { fieldValue } from '#lib/components/input/field-value.svelte.js';
import { fieldControlAttrs, fieldInvalid } from '#lib/utils/fieldControl.js';
import { registerId } from '#lib/utils/registerId.js';
import { toggleCtx } from '#lib/utils/toggleContext.js';
import { box, boxWith } from 'svelte-toolbelt';

export interface ToggleInputOptions {
	/** Fallback id for the native input when neither `id` nor a Field `name` is given. */
	uid: string;
	checked: () => boolean;
	setChecked: (v: boolean) => void;
	invalid: () => boolean | undefined;
	disabled: () => boolean | undefined;
	ref: () => HTMLInputElement | null;
	setRef: (v: HTMLInputElement | null) => void;
	/** Attributes meant for the native input (everything that isn't a variant). */
	attrs: () => Record<string, unknown>;
	/** Runs after the state update on a user toggle. */
	onToggle?: () => void;
}

/**
 * State and wiring behind a checkbox-like control: Field / Form integration,
 * the native input's attributes, and the `toggleCtx` its parts consume.
 * Call it once during the root component's initialisation.
 */
export function useToggleInput(opts: ToggleInputOptions) {
	const field_ctx = fieldCtx.getOr(undefined);

	const invalid = $derived(Boolean(fieldInvalid(field_ctx, opts.invalid())));
	const disabled = $derived(Boolean(field_ctx ? field_ctx.disabled.current : opts.disabled()));

	// Inside an auto Field the value lives in the form store, which isn't reactive -> so mirror it locally to keep the visual state in sync
	const val = field_ctx ? fieldValue<boolean>(opts.checked, opts.setChecked) : undefined;
	let mirrored = $state(Boolean(val?.isAuto ? val.current : false));
	const checked = $derived(val?.isAuto ? mirrored : Boolean(opts.checked()));

	const labelId = box<string | undefined>(undefined);
	const descriptionId = box<string | undefined>(undefined);
	const contentId = box<string | undefined>(undefined);

	const inputAttrs = $derived.by(() => {
		const own = opts.attrs();
		const merged: Record<string, unknown> = {
			...fieldControlAttrs(field_ctx, opts.invalid()),
			...own
		};

		const id = (own.id as string | undefined) ?? (merged.id as string | undefined) ?? opts.uid;

		// An explicit aria-label / aria-labelledby wins. Otherwise prefer a Label inside
		// the control, then a Field label, then the Content's bare text.
		const named = own['aria-label'] != null || own['aria-labelledby'] != null;
		const labelledby = named
			? own['aria-labelledby']
			: (labelId.current ?? field_ctx?.labelId.current ?? contentId.current);

		const describedby =
			own['aria-describedby'] ??
			([descriptionId.current, field_ctx?.descriptionId.current].filter(Boolean).join(' ') ||
				undefined);

		return {
			...merged,
			id,
			disabled: disabled || undefined,
			'aria-labelledby': labelledby,
			'aria-describedby': describedby
		};
	});

	function onchange(e: Event & { currentTarget: HTMLInputElement }) {
		const el = e.currentTarget;
		mirrored = el.checked;
		if (val) val.current = el.checked;
		else opts.setChecked(el.checked);
		opts.onToggle?.();
		(opts.attrs().onchange as ((e: Event) => void) | undefined)?.(e);
	}

	toggleCtx.set({
		inputId: boxWith(() => inputAttrs.id),
		inputAttrs: boxWith(() => inputAttrs),
		checked: boxWith(() => checked),
		disabled: boxWith(() => disabled),
		invalid: boxWith(() => invalid),
		ref: boxWith(opts.ref, opts.setRef),
		onchange,
		labelId,
		descriptionId,
		contentId
	});

	return {
		get checked() {
			return checked;
		},
		get invalid() {
			return invalid;
		},
		get disabled() {
			return disabled;
		}
	};
}

const INTERACTIVE = 'input, label, button, a[href], select, textarea, [contenteditable]';

/**
 * Wiring for a control's `Content` part: registers its id as the input's
 * fallback label and forwards clicks on bare text to the input, the way a
 * wrapping `<label>` would. Once a `Label` is present it handles that itself.
 */
export function useToggleContent(id: () => string) {
	const ctx = toggleCtx.get();

	$effect.pre(() => registerId(ctx.contentId, id()));

	return function onclick(e: MouseEvent) {
		if (e.defaultPrevented || ctx.labelId.current) return;
		if ((e.target as Element | null)?.closest(INTERACTIVE)) return;
		ctx.ref.current?.click();
	};
}
