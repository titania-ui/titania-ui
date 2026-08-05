import z from 'zod';

export const loginSchema = z.object({
	email: z.email({ error: 'Invalid email address' }).min(1, { error: 'Email is required' }),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	remember: z.boolean().default(false)
});

export const reservationSchema = z.object({
	party_size: z.number().min(1, { error: 'Party size is required' }),
	seating: z.enum(['indoor', 'patio', 'bar'], { error: 'Seating preference is required' }),
	notes: z.string().optional()
});
