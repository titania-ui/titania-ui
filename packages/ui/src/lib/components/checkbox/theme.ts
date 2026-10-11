import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'tacheckbox',
		control: 'tacheckbox__control',
		indicator: 'tacheckbox__indicator'
	},
	variants: {
		invalid: {
			true: {
				root: 'tacheckbox--invalid',
				control: 'tacheckbox__control--invalid',
				indicator: 'tacheckbox__indicator--invalid'
			}
		},
		color: {
			dark: { root: 'tacheckbox--color-dark' },
			zinc: { root: 'tacheckbox--color-zinc' },
			white: { root: 'tacheckbox--color-white' },
			red: { root: 'tacheckbox--color-red' },
			orange: { root: 'tacheckbox--color-orange' },
			amber: { root: 'tacheckbox--color-amber' },
			yellow: { root: 'tacheckbox--color-yellow' },
			lime: { root: 'tacheckbox--color-lime' },
			green: { root: 'tacheckbox--color-green' },
			emerald: { root: 'tacheckbox--color-emerald' },
			teal: { root: 'tacheckbox--color-teal' },
			cyan: { root: 'tacheckbox--color-cyan' },
			sky: { root: 'tacheckbox--color-sky' },
			blue: { root: 'tacheckbox--color-blue' },
			indigo: { root: 'tacheckbox--color-indigo' },
			violet: { root: 'tacheckbox--color-violet' },
			purple: { root: 'tacheckbox--color-purple' },
			fuchsia: { root: 'tacheckbox--color-fuchsia' },
			pink: { root: 'tacheckbox--color-pink' },
			rose: { root: 'tacheckbox--color-rose' }
		},
		disabled: {
			true: {
				root: 'tacheckbox--disabled',
				control: 'tacheckbox__control--disabled',
				indicator: 'tacheckbox__indicator--disabled'
			}
		}
	},
	defaultVariants: {
		invalid: false,
		disabled: false
	}
});
