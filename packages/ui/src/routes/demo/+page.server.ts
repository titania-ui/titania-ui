import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { reservationSchema } from './utils.ts';

export const load = async () => {
	const form = await superValidate(zod4(reservationSchema));
	return { form };
};
