// field-value.svelte.ts
import { get } from 'svelte/store';
import { fieldCtx, formCtx } from './form-context.ts';

export function fieldValue<T>(getManual: () => T, setManual: (v: T) => void) {
	const ctx = fieldCtx.get();
	const form_ctx = formCtx.get();
	const isAuto = ctx.auto.current;

	if (isAuto && !form_ctx) {
		throw new Error('Form control: a parent Form.Root is required when Form.Field "auto" is true');
	}

	return {
		get current() {
			if (!isAuto) return getManual();
			return get(form_ctx!.form.current.form)[ctx.name.current] as T;
		},
		set current(v: T) {
			if (!isAuto) {
				setManual(v);
				return;
			}
			form_ctx!.form.current.form.update((f) => {
				f[ctx.name.current] = v;
				return f;
			});
		},
		isAuto
	};
}
