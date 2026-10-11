<script lang="ts" module>
	import { Checkbox, CheckboxField, Field, Label } from '#lib';
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
						'A native checkbox with a styled control. Supports an indeterminate (mixed) state and exposes `{ checked, indeterminate }` to its children.'
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
				code: `<CheckboxField name="terms">\n\t<Checkbox>\n\t\t<Checkbox.Control />\n\t\tAccept terms and conditions\n\t</Checkbox>\n</CheckboxField>`
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

		await step('toggles when the label text is clicked', async () => {
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
	}}
>
	{#snippet template(props)}
		<CheckboxField name="terms">
			<Checkbox {...props as RootProps}>
				<Checkbox.Control />
				Accept terms and conditions
			</Checkbox>
		</CheckboxField>
	{/snippet}
</Story>

<Story
	name="Indeterminate"
	args={{ indeterminate: true }}
	parameters={{
		docs: {
			source: {
				code: `<Checkbox indeterminate>\n\t<Checkbox.Control />\n\tSelect all\n</Checkbox>`
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
			Select all
		</Checkbox>
	{/snippet}
</Story>

<Story
	name="Children State"
	parameters={{
		docs: {
			source: {
				code: `<Checkbox indeterminate>\n\t{#snippet children({ checked, indeterminate })}\n\t\t<Checkbox.Control />\n\t\t{indeterminate ? 'Some' : checked ? 'All' : 'None'}\n\t{/snippet}\n</Checkbox>`
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
				{indeterminate ? 'Some selected' : checked ? 'All selected' : 'None selected'}
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
				code: `<CheckboxField errors={['You must accept the terms.']}>\n\t<Checkbox>\n\t\t<Checkbox.Control />\n\t\tAccept terms and conditions\n\t</Checkbox>\n\t<Field.Error />\n</CheckboxField>`
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
				Accept terms and conditions
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
				code: `<CheckboxField name="terms" disabled>\n\t<Checkbox>\n\t\t<Checkbox.Control />\n\t\tAccept terms and conditions\n\t</Checkbox>\n</CheckboxField>`
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
				Accept terms and conditions
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
			const control = checkbox.parentElement!.querySelector('.tacheckbox__control')!;
			const styles = getComputedStyle(control);
			await expect(styles.outlineStyle).not.toBe('none');
		});
	}}
>
	{#snippet template()}
		<Checkbox>
			<Checkbox.Control />
			Accept terms and conditions
		</Checkbox>
	{/snippet}
</Story>

<Story
	name="With Label"
	parameters={{
		docs: {
			source: {
				code: `<CheckboxField name="newsletter">\n\t<Checkbox>\n\t\t<Checkbox.Control />\n\t</Checkbox>\n\t<Label>Subscribe to the newsletter</Label>\n</CheckboxField>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		await step('is named by the Label and toggled through it', async () => {
			const checkbox = canvas.getByRole('checkbox', { name: 'Subscribe to the newsletter' });
			await userEvent.click(canvas.getByText('Subscribe to the newsletter'));
			await expect(checkbox).toBeChecked();
		});
	}}
>
	{#snippet template()}
		<CheckboxField name="newsletter">
			<Checkbox>
				<Checkbox.Control />
			</Checkbox>
			<Label>Subscribe to the newsletter</Label>
		</CheckboxField>
	{/snippet}
</Story>
