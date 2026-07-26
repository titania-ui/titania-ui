import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema_signup } from './shared.ts';

export const load = async () => {
	return {
		form_signup: await superValidate(zod4(schema_signup))
	};
};
