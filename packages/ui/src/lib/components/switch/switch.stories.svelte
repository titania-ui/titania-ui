<script lang="ts" module>
	import { CheckboxField, Field, Label, Switch, Text } from '#lib';
	import type { ToolingProps } from '#lib/types/props.js';
	import type { RootCfg, RootProps } from './index.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Switch>({
		title: 'Components/Forms/Switch',
		component: Switch,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: { include: ['size', 'color', 'invalid', 'disabled', 'checked'] },
			docs: {
				description: {
					component:
						'An on/off toggle built on a native `<input type="checkbox" role="switch">`. `Switch.Control` is the track, `Switch.Thumb` the knob (optionally holding a `Switch.Icon`), and `Switch.Content` holds the `Label` and an optional `Text` description.'
				}
			}
		},
		argTypes: {
			size: {
				control: { type: 'select' },
				options: Object.keys(Switch.theme.variants.size),
				table: {
					category: 'Appearance',
					type: { summary: Object.keys(Switch.theme.variants.size).join(' | ') },
					defaultValue: { summary: 'md' }
				}
			},
			color: {
				control: { type: 'select' },
				options: Object.keys(Switch.theme.variants.color),
				table: {
					category: 'Appearance',
					type: { summary: Object.keys(Switch.theme.variants.color).join(' | ') }
				}
			},
			checked: {
				control: { type: 'boolean' },
				type: 'boolean',
				table: {
					category: 'Behavior',
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			invalid: {
				control: { type: 'boolean' },
				type: 'boolean',
				table: {
					category: 'Appearance',
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			disabled: {
				control: { type: 'boolean' },
				type: 'boolean',
				table: {
					category: 'Appearance',
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			}
		}
	});
</script>

<Story
	name="Default"
	parameters={{
		docs: {
			source: {
				code: `<Switch>\n\t<Switch.Control />\n\t<Switch.Content>\n\t\t<Label>Enable notifications</Label>\n\t\t<Text>Get notified when someone mentions you.</Text>\n\t</Switch.Content>\n</Switch>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const toggle = canvas.getByRole('switch', { name: 'Enable notifications' });

		await step('renders as an unchecked, enabled native switch', async () => {
			await expect(toggle.tagName).toBe('INPUT');
			await expect(toggle).toBeEnabled();
			await expect(toggle).not.toBeChecked();
		});

		await step('is described by the Text', async () => {
			await expect(toggle).toHaveAccessibleDescription('Get notified when someone mentions you.');
		});

		await step('toggles when the label is clicked', async () => {
			await userEvent.click(canvas.getByText('Enable notifications'));
			await expect(toggle).toBeChecked();
			await userEvent.click(canvas.getByText('Enable notifications'));
			await expect(toggle).not.toBeChecked();
		});

		await step('toggles with the Space key', async () => {
			await userEvent.tab();
			await expect(toggle).toHaveFocus();
			await userEvent.keyboard(' ');
			await expect(toggle).toBeChecked();
		});

		await step('toggles when the track is clicked', async () => {
			await userEvent.click(toggle.closest('.taswitch__control')!);
			await expect(toggle).not.toBeChecked();
		});
	}}
>
	{#snippet template(props)}
		<Switch {...props as RootProps}>
			<Switch.Control />
			<Switch.Content>
				<Label>Enable notifications</Label>
				<Text>Get notified when someone mentions you.</Text>
			</Switch.Content>
		</Switch>
	{/snippet}
</Story>

<Story
	name="Inline Text"
	parameters={{
		docs: {
			source: {
				code: `<Switch>\n\t<Switch.Content>\n\t\t<Switch.Control>\n\t\t\t<Switch.Thumb />\n\t\t</Switch.Control>\n\t\tEnable notifications\n\t</Switch.Content>\n</Switch>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const toggle = canvas.getByRole('switch', { name: 'Enable notifications' });

		await step('toggles exactly once when the bare text is clicked', async () => {
			await userEvent.click(canvas.getByText('Enable notifications'));
			await expect(toggle).toBeChecked();
			await userEvent.click(canvas.getByText('Enable notifications'));
			await expect(toggle).not.toBeChecked();
		});
	}}
>
	{#snippet template(props)}
		<Switch {...props as RootProps}>
			<Switch.Content>
				<Switch.Control>
					<Switch.Thumb />
				</Switch.Control>
				Enable notifications
			</Switch.Content>
		</Switch>
	{/snippet}
</Story>

<Story
	name="Aria Label"
	parameters={{
		docs: {
			source: {
				code: `<Switch aria-label="Enable notifications">\n\t<Switch.Content>\n\t\t<Switch.Control>\n\t\t\t<Switch.Thumb />\n\t\t</Switch.Control>\n\t</Switch.Content>\n</Switch>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		await step('is named by aria-label', async () => {
			await expect(canvas.getByRole('switch', { name: 'Enable notifications' })).toBeVisible();
		});
	}}
>
	{#snippet template(props)}
		<Switch aria-label="Enable notifications" {...props as RootProps}>
			<Switch.Content>
				<Switch.Control>
					<Switch.Thumb />
				</Switch.Control>
			</Switch.Content>
		</Switch>
	{/snippet}
</Story>

<Story
	name="With Icon"
	parameters={{
		docs: {
			source: {
				code: `<Switch>\n\t<Switch.Control>\n\t\t<Switch.Thumb>\n\t\t\t<Switch.Icon />\n\t\t</Switch.Thumb>\n\t</Switch.Control>\n\t<Switch.Content>\n\t\t<Label>Dark mode</Label>\n\t</Switch.Content>\n</Switch>\n\n<Switch>\n\t<Switch.Control>\n\t\t<Switch.Thumb>\n\t\t\t<Switch.Icon class="icon-[heroicons--heart-solid]" />\n\t\t</Switch.Thumb>\n\t</Switch.Control>\n\t<Switch.Content>\n\t\t<Label>Favorite</Label>\n\t</Switch.Content>\n</Switch>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const toggle = canvas.getByRole('switch', { name: 'Dark mode' });
		const thumb = toggle.closest('.taswitch__control')!.querySelector('.taswitch__thumb')!;
		const icon = thumb.querySelector('.taswitch__icon')!;

		await step('renders a decorative icon inside the thumb', async () => {
			await expect(icon).toHaveAttribute('aria-hidden', 'true');
		});

		await step('mirrors the checked state on thumb and icon', async () => {
			await expect(thumb).not.toHaveAttribute('data-checked');
			await userEvent.click(toggle);
			await expect(thumb).toHaveAttribute('data-checked');
			await expect(icon).toHaveAttribute('data-checked');
		});
	}}
>
	{#snippet template(props)}
		<div class="flex flex-col gap-4">
			<Switch {...props as RootProps}>
				<Switch.Control>
					<Switch.Thumb>
						<Switch.Icon />
					</Switch.Thumb>
				</Switch.Control>
				<Switch.Content>
					<Label>Dark mode</Label>
				</Switch.Content>
			</Switch>
			<Switch {...props as RootProps}>
				<Switch.Control>
					<Switch.Thumb>
						<Switch.Icon class="icon-[heroicons--heart-solid]" />
					</Switch.Thumb>
				</Switch.Control>
				<Switch.Content>
					<Label>Favorite</Label>
				</Switch.Content>
			</Switch>
		</div>
	{/snippet}
</Story>

<Story
	name="Sizes"
	parameters={{
		docs: {
			source: {
				code: `<Switch size="sm">…</Switch>\n<Switch size="md">…</Switch>\n<Switch size="lg">…</Switch>`
			}
		}
	}}
>
	{#snippet template(props)}
		<div class="flex flex-col gap-4">
			{#each Object.keys(Switch.theme.variants.size) as size (size)}
				<Switch {...props as RootProps} size={size as RootProps['size']} checked>
					<Switch.Control />
					<Switch.Content>
						<Label>Size {size}</Label>
					</Switch.Content>
				</Switch>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="Colors"
	parameters={{
		docs: {
			source: {
				code: `<Switch color="red" checked>\n\t<Switch.Control />\n\t<Switch.Content>\n\t\t<Label>red</Label>\n\t</Switch.Content>\n</Switch>`
			}
		}
	}}
>
	{#snippet template(props)}
		<div class="grid grid-cols-4 gap-4">
			{#each Object.keys(Switch.theme.variants.color) as color (color)}
				<Switch {...props as RootProps} color={color as RootProps['color']} checked>
					<Switch.Control />
					<Switch.Content>
						<Label>{color}</Label>
					</Switch.Content>
				</Switch>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="Invalid"
	args={{ invalid: true }}
	parameters={{
		docs: {
			source: {
				code: `<CheckboxField name="notifications" errors={['Notifications are required.']}>\n\t<Switch>\n\t\t<Switch.Control />\n\t\t<Switch.Content>\n\t\t\t<Label>Enable notifications</Label>\n\t\t</Switch.Content>\n\t</Switch>\n\t<Field.Error />\n</CheckboxField>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		const toggle = canvas.getByRole('switch', { name: 'Enable notifications' });

		await step('is marked invalid for assistive tech', async () => {
			await expect(toggle).toHaveAttribute('aria-invalid', 'true');
		});

		await step('shows the error message', async () => {
			await expect(canvas.getByText('Notifications are required.')).toBeVisible();
		});
	}}
>
	{#snippet template(props)}
		<CheckboxField
			name="notifications"
			errors={props.invalid ? ['Notifications are required.'] : []}
		>
			<Switch {...props as RootProps}>
				<Switch.Control />
				<Switch.Content>
					<Label>Enable notifications</Label>
				</Switch.Content>
			</Switch>
			<Field.Error />
		</CheckboxField>
	{/snippet}
</Story>

<Story
	name="Disabled"
	args={{ disabled: true }}
	parameters={{
		docs: {
			source: {
				code: `<CheckboxField name="notifications" disabled>\n\t<Switch>\n\t\t<Switch.Control />\n\t\t<Switch.Content>\n\t\t\t<Label>Enable notifications</Label>\n\t\t</Switch.Content>\n\t</Switch>\n</CheckboxField>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const toggle = canvas.getByRole('switch', { name: 'Enable notifications' });

		await step('is marked disabled for assistive tech', async () => {
			await expect(toggle).toBeDisabled();
		});

		await step('ignores clicks and is skipped by Tab', async () => {
			await userEvent.click(canvas.getByText('Enable notifications'));
			await expect(toggle).not.toBeChecked();
			await userEvent.tab();
			await expect(toggle).not.toHaveFocus();
		});
	}}
>
	{#snippet template(props)}
		<CheckboxField name="notifications" disabled={Boolean(props.disabled)}>
			<Switch {...props as RootProps}>
				<Switch.Control />
				<Switch.Content>
					<Label>Enable notifications</Label>
				</Switch.Content>
			</Switch>
		</CheckboxField>
	{/snippet}
</Story>

<Story
	name="Focus Visible"
	tags={['!dev', '!autodocs']}
	play={async ({ canvas, userEvent, step }) => {
		await step('shows a visible focus ring after keyboard navigation', async () => {
			const toggle = canvas.getByRole('switch');
			await userEvent.tab();
			await expect(toggle).toHaveFocus();
			await expect(toggle).toHaveAttribute('data-focus-visible');
			const control = toggle.closest('.taswitch__control')!;
			await expect(getComputedStyle(control).boxShadow).not.toBe('none');
		});
	}}
>
	{#snippet template()}
		<Switch>
			<Switch.Control />
			<Switch.Content>
				<Label>Enable notifications</Label>
			</Switch.Content>
		</Switch>
	{/snippet}
</Story>
