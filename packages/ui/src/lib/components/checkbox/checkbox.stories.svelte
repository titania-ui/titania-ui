<script lang="ts" module>
	import { Checkbox, CheckboxField, Field, Label, Text } from '#lib';
	import type { ToolingProps } from '#lib/types/props.js';
	import type { RootCfg, RootProps } from './index.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Checkbox>({
		title: 'Components/Forms/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: { include: ['invalid', 'disabled', 'indeterminate', 'checked'] },
			docs: {
				description: {
					component:
						'A native checkbox with a styled control. `Checkbox.Content` holds the `Label` (and an optional `Text` description) next to the control. Supports an indeterminate (mixed) state and exposes `{ checked, indeterminate }` to its children.'
				}
			}
		},
		argTypes: {
			checked: {
				control: { type: 'boolean' },
				type: 'boolean',
				table: {
					category: 'Behavior',
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			indeterminate: {
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
				code: `<CheckboxField name="terms">\n\t<Checkbox>\n\t\t<Checkbox.Control />\n\t\t<Checkbox.Content>\n\t\t\t<Label>Accept terms and conditions</Label>\n\t\t</Checkbox.Content>\n\t</Checkbox>\n</CheckboxField>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms and conditions' });

		await step('renders as an unchecked, enabled native checkbox', async () => {
			await expect(checkbox.tagName).toBe('INPUT');
			await expect(checkbox).toBeEnabled();
			await expect(checkbox).not.toBeChecked();
		});

		await step('toggles when the label is clicked', async () => {
			await userEvent.click(canvas.getByText('Accept terms and conditions'));
			await expect(checkbox).toBeChecked();
			await userEvent.click(canvas.getByText('Accept terms and conditions'));
			await expect(checkbox).not.toBeChecked();
		});

		await step('toggles with the Space key', async () => {
			await userEvent.tab();
			await expect(checkbox).toHaveFocus();
			await userEvent.keyboard(' ');
			await expect(checkbox).toBeChecked();
		});

		await step('toggles when the control is clicked', async () => {
			await userEvent.click(checkbox.closest('.tacheckbox__control')!);
			await expect(checkbox).not.toBeChecked();
		});
	}}
>
	{#snippet template(props)}
		<CheckboxField name="terms">
			<Checkbox {...props as RootProps}>
				<Checkbox.Control />
				<Checkbox.Content>
					<Label>Accept terms and conditions</Label>
				</Checkbox.Content>
			</Checkbox>
		</CheckboxField>
	{/snippet}
</Story>

<Story
	name="With Description"
	parameters={{
		docs: {
			source: {
				code: `<Checkbox>\n\t<Checkbox.Control />\n\t<Checkbox.Content>\n\t\t<Label>Free shipping via Flowbite</Label>\n\t\t<Text>For orders shipped from $25 in books or $29 in other categories</Text>\n\t</Checkbox.Content>\n</Checkbox>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const checkbox = canvas.getByRole('checkbox', { name: 'Free shipping via Flowbite' });

		await step('is described by the Text', async () => {
			await expect(checkbox).toHaveAccessibleDescription(
				'For orders shipped from $25 in books or $29 in other categories'
			);
		});

		await step('renders the label as a separate <label> for the input', async () => {
			const label = canvas.getByText('Free shipping via Flowbite');
			await expect(label.tagName).toBe('LABEL');
			await expect(label).toHaveAttribute('for', checkbox.id);
			await expect(label.contains(checkbox)).toBe(false);
		});

		await step('does not toggle when the description is clicked', async () => {
			await userEvent.click(
				canvas.getByText('For orders shipped from $25 in books or $29 in other categories')
			);
			await expect(checkbox).not.toBeChecked();
		});
	}}
>
	{#snippet template(props)}
		<Checkbox {...props as RootProps}>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Free shipping via Flowbite</Label>
				<Text>For orders shipped from $25 in books or $29 in other categories</Text>
			</Checkbox.Content>
		</Checkbox>
	{/snippet}
</Story>

<Story
	name="Inline Text"
	parameters={{
		docs: {
			source: {
				code: `<Checkbox>\n\t<Checkbox.Content>\n\t\t<Checkbox.Control />\n\t\tSubscribe to the newsletter\n\t</Checkbox.Content>\n</Checkbox>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const checkbox = canvas.getByRole('checkbox', { name: 'Subscribe to the newsletter' });

		await step('is named by the bare text', async () => {
			await expect(checkbox).toBeInTheDocument();
		});

		await step('toggles exactly once when the text is clicked', async () => {
			await userEvent.click(canvas.getByText('Subscribe to the newsletter'));
			await expect(checkbox).toBeChecked();
			await userEvent.click(canvas.getByText('Subscribe to the newsletter'));
			await expect(checkbox).not.toBeChecked();
		});
	}}
>
	{#snippet template(props)}
		<Checkbox {...props as RootProps}>
			<Checkbox.Content>
				<Checkbox.Control />
				Subscribe to the newsletter
			</Checkbox.Content>
		</Checkbox>
	{/snippet}
</Story>

<Story
	name="Aria Label"
	parameters={{
		docs: {
			source: {
				code: `<Checkbox aria-label="Select row">\n\t<Checkbox.Content>\n\t\t<Checkbox.Control />\n\t</Checkbox.Content>\n</Checkbox>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		await step('is named by aria-label', async () => {
			await expect(canvas.getByRole('checkbox', { name: 'Select row' })).toBeInTheDocument();
		});
	}}
>
	{#snippet template(props)}
		<Checkbox aria-label="Select row" {...props as RootProps}>
			<Checkbox.Content>
				<Checkbox.Control />
			</Checkbox.Content>
		</Checkbox>
	{/snippet}
</Story>

<Story
	name="Indeterminate"
	args={{ indeterminate: true }}
	parameters={{
		docs: {
			source: {
				code: `<Checkbox indeterminate>\n\t<Checkbox.Control />\n\t<Checkbox.Content>\n\t\t<Label>Select all</Label>\n\t</Checkbox.Content>\n</Checkbox>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const checkbox = canvas.getByRole('checkbox', { name: 'Select all' });

		await step('is exposed as mixed to assistive tech', async () => {
			await expect(checkbox).toBePartiallyChecked();
		});

		await step('resolves to checked on the first click', async () => {
			await userEvent.click(checkbox);
			await expect(checkbox).not.toBePartiallyChecked();
			await expect(checkbox).toBeChecked();
		});
	}}
>
	{#snippet template(props)}
		<Checkbox {...props as RootProps}>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Select all</Label>
			</Checkbox.Content>
		</Checkbox>
	{/snippet}
</Story>

<Story
	name="Children State"
	parameters={{
		docs: {
			source: {
				code: `<Checkbox indeterminate>\n\t{#snippet children({ checked, indeterminate })}\n\t\t<Checkbox.Control />\n\t\t<Checkbox.Content>\n\t\t\t<Label>{indeterminate ? 'Some' : checked ? 'All' : 'None'} selected</Label>\n\t\t</Checkbox.Content>\n\t{/snippet}\n</Checkbox>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		await step('passes checked and indeterminate to the children snippet', async () => {
			const checkbox = canvas.getByRole('checkbox');
			await expect(canvas.getByText('Some selected')).toBeVisible();
			await userEvent.click(checkbox);
			await expect(canvas.getByText('All selected')).toBeVisible();
			await userEvent.click(checkbox);
			await expect(canvas.getByText('None selected')).toBeVisible();
		});
	}}
>
	{#snippet template()}
		<Checkbox indeterminate>
			{#snippet children({ checked, indeterminate })}
				<Checkbox.Control />
				<Checkbox.Content>
					<Label
						>{indeterminate ? 'Some selected' : checked ? 'All selected' : 'None selected'}</Label
					>
				</Checkbox.Content>
			{/snippet}
		</Checkbox>
	{/snippet}
</Story>

<Story
	name="Invalid"
	args={{ invalid: true }}
	parameters={{
		docs: {
			source: {
				code: `<CheckboxField errors={['You must accept the terms.']}>\n\t<Checkbox>\n\t\t<Checkbox.Control />\n\t\t<Checkbox.Content>\n\t\t\t<Label>Accept terms and conditions</Label>\n\t\t</Checkbox.Content>\n\t</Checkbox>\n\t<Field.Error />\n</CheckboxField>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms and conditions' });

		await step('is marked invalid for assistive tech', async () => {
			await expect(checkbox).toHaveAttribute('aria-invalid', 'true');
		});

		await step('shows the error message', async () => {
			await expect(canvas.getByText('You must accept the terms.')).toBeVisible();
		});
	}}
>
	{#snippet template(props)}
		<CheckboxField name="terms" errors={props.invalid ? ['You must accept the terms.'] : []}>
			<Checkbox {...props as RootProps}>
				<Checkbox.Control />
				<Checkbox.Content>
					<Label>Accept terms and conditions</Label>
				</Checkbox.Content>
			</Checkbox>
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
				code: `<CheckboxField name="terms" disabled>\n\t<Checkbox>\n\t\t<Checkbox.Control />\n\t\t<Checkbox.Content>\n\t\t\t<Label>Accept terms and conditions</Label>\n\t\t</Checkbox.Content>\n\t</Checkbox>\n</CheckboxField>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms and conditions' });

		await step('is marked disabled for assistive tech', async () => {
			await expect(checkbox).toBeDisabled();
		});

		await step('ignores clicks and is skipped by Tab', async () => {
			await userEvent.click(canvas.getByText('Accept terms and conditions'));
			await expect(checkbox).not.toBeChecked();
			await userEvent.tab();
			await expect(checkbox).not.toHaveFocus();
		});
	}}
>
	{#snippet template(props)}
		<CheckboxField name="terms" disabled={Boolean(props.disabled)}>
			<Checkbox {...props as RootProps}>
				<Checkbox.Control />
				<Checkbox.Content>
					<Label>Accept terms and conditions</Label>
				</Checkbox.Content>
			</Checkbox>
		</CheckboxField>
	{/snippet}
</Story>

<Story
	name="Focus Visible"
	tags={['!dev', '!autodocs']}
	play={async ({ canvas, userEvent, step }) => {
		await step('shows a visible focus ring after keyboard navigation', async () => {
			const checkbox = canvas.getByRole('checkbox');
			await userEvent.tab();
			await expect(checkbox).toHaveFocus();
			await expect(checkbox).toHaveAttribute('data-focus-visible');
			const control = checkbox.closest('.tacheckbox__control')!;
			await expect(getComputedStyle(control).boxShadow).not.toBe('none');
		});
	}}
>
	{#snippet template()}
		<Checkbox>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Accept terms and conditions</Label>
			</Checkbox.Content>
		</Checkbox>
	{/snippet}
</Story>
