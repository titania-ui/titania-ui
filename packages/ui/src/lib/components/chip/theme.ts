import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tachip',
		label: 'tachip__label'
	},
	variants: {
		color: {
			default: { root: 'tachip--color-default' },
			accent: { root: 'tachip--color-accent' },
			success: { root: 'tachip--color-success' },
			warning: { root: 'tachip--color-warning' },
			danger: { root: 'tachip--color-danger' },

			red: { root: 'tachip--color-red' },
			orange: { root: 'tachip--color-orange' },
			amber: { root: 'tachip--color-amber' },
			yellow: { root: 'tachip--color-yellow' },
			lime: { root: 'tachip--color-lime' },
			green: { root: 'tachip--color-green' },
			emerald: { root: 'tachip--color-emerald' },
			teal: { root: 'tachip--color-teal' },
			cyan: { root: 'tachip--color-cyan' },
			sky: { root: 'tachip--color-sky' },
			blue: { root: 'tachip--color-blue' },
			indigo: { root: 'tachip--color-indigo' },
			violet: { root: 'tachip--color-violet' },
			purple: { root: 'tachip--color-purple' },
			fuchsia: { root: 'tachip--color-fuchsia' },
			pink: { root: 'tachip--color-pink' },
			rose: { root: 'tachip--color-rose' },
			zinc: { root: 'tachip--color-zinc' }
		},
		size: {
			sm: { root: 'tachip--size-sm' },
			md: { root: 'tachip--size-md' },
			lg: { root: 'tachip--size-lg' }
		}
	},
	defaultVariants: {
		color: 'default',
		size: 'md',
		variant: 'primary'
	}
});
