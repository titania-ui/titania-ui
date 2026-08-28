import type { FieldCtx } from '#lib/components/field/field-context.ts';

export function fieldInvalid(
	field_ctx: FieldCtx | undefined,
	invalid: boolean | undefined
): boolean | undefined {
	return field_ctx ? field_ctx.errors.current.length > 0 : invalid;
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
					'aria-describedby': field_ctx.descriptionId.current,
					disabled: field_ctx.disabled.current || undefined,
					name: field_ctx.name.current,
					...field_ctx.constraints.current
				}
			: {})
	};
}
