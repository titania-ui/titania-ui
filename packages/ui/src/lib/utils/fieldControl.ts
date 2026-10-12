import type { FieldCtx } from '#lib/components/field/field-context.js';

export function fieldInvalid(
	field_ctx: FieldCtx | undefined,
	invalid: boolean | undefined
): boolean | undefined {
	return field_ctx ? field_ctx.errors.current.length > 0 : invalid;
}

export function fieldDescribedBy(
	field_ctx: FieldCtx | undefined,
	invalid?: boolean | undefined
): string | undefined {
	if (!field_ctx) return undefined;
	const ids = [
		field_ctx.descriptionId.current,
		fieldInvalid(field_ctx, invalid) ? field_ctx.errorId.current : undefined
	];
	return ids.filter(Boolean).join(' ') || undefined;
}

export function fieldControlAttrs(
	field_ctx: FieldCtx | undefined,
	invalid?: boolean | undefined
): Record<string, unknown> {
	return {
		'data-slot': 'control',
		'aria-invalid': fieldInvalid(field_ctx, invalid) ? 'true' : undefined,
		...(field_ctx
			? {
					'aria-labelledby': field_ctx.labelId.current,
					'aria-describedby': fieldDescribedBy(field_ctx, invalid),
					disabled: field_ctx.disabled.current || undefined,
					name: field_ctx.name.current,
					id: field_ctx.name.current,
					...field_ctx.constraints.current
				}
			: {})
	};
}
