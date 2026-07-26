import { z } from 'zod';

export const schema_signup = z.object({
	name: z.string().min(3, 'Must be at least 3 characters long'),
	email: z.email(),
	age: z.number().int().positive().optional(),
	password: z.string().min(8),
	confirmPassword: z.string(),
	terms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions')
});
