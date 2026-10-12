import { tv } from 'tailwind-variants/lite';

export const theme = tv({
	slots: {
		root: 'taswitch',
		control: 'taswitch__control',
		thumb: 'taswitch__thumb',
		icon: 'taswitch__icon',
		content: 'taswitch__content'
	},
	variants: {
		size: {
			sm: { root: 'taswitch--size-sm' },
			md: { root: 'taswitch--size-md' },
			lg: { root: 'taswitch--size-lg' }
		},
		invalid: {
			true: {
				root: 'taswitch--invalid',
				control: 'taswitch__control--invalid',
				thumb: 'taswitch__thumb--invalid',
				icon: 'taswitch__icon--invalid',
				content: 'taswitch__content--invalid'
			}
		},
		color: {
			dark: { root: 'taswitch--color-dark' },
			zinc: { root: 'taswitch--color-zinc' },
			white: { root: 'taswitch--color-white' },
			red: { root: 'taswitch--color-red' },
			orange: { root: 'taswitch--color-orange' },
			amber: { root: 'taswitch--color-amber' },
			yellow: { root: 'taswitch--color-yellow' },
			lime: { root: 'taswitch--color-lime' },
			green: { root: 'taswitch--color-green' },
			emerald: { root: 'taswitch--color-emerald' },
			teal: { root: 'taswitch--color-teal' },
			cyan: { root: 'taswitch--color-cyan' },
			sky: { root: 'taswitch--color-sky' },
			blue: { root: 'taswitch--color-blue' },
			indigo: { root: 'taswitch--color-indigo' },
			violet: { root: 'taswitch--color-violet' },
			purple: { root: 'taswitch--color-purple' },
			fuchsia: { root: 'taswitch--color-fuchsia' },
			pink: { root: 'taswitch--color-pink' },
			rose: { root: 'taswitch--color-rose' }
		},
		disabled: {
			true: {
				root: 'taswitch--disabled',
				control: 'taswitch__control--disabled',
				thumb: 'taswitch__thumb--disabled',
				icon: 'taswitch__icon--disabled',
				content: 'taswitch__content--disabled'
			}
		}
	},
	defaultVariants: {
		size: 'md',
		invalid: false,
		disabled: false
	}
});
