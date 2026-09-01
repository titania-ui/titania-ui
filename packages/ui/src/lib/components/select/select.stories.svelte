<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Select, Field, Label } from '#lib';
	import { expect } from 'storybook/test';
	import type { ToolingProps } from '#lib/types/props.js';
	import type { RootCfg, RootProps } from './index.js';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Select>({
		title: 'Components/Forms/Select',
		component: Select,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: ['invalid', 'disabled', 'multiple']
			},
			docs: {
				description: {
					component: 'A native dropdown for choosing options from a predefined list'
				}
			}
		},
		argTypes: {
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
			},
			multiple: {
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
				code: `<Field>
	<Label>Seating preference</Label>
	<Select>
		<option value="indoor">Indoor</option>
		<option value="patio">Patio</option>
		<option value="bar">Bar</option>
	</Select>
</Field>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const select = canvas.getByLabelText('Seating preference');

		await step('renders as a native, enabled dropdown', async () => {
			await expect(select).toBeVisible();
			await expect(select).toBeEnabled();
			await expect(select.tagName).toBe('SELECT');
		});

		await step('lets the user choose an option', async () => {
			await userEvent.selectOptions(select, 'patio');
			await expect(select).toHaveValue('patio');
		});

		await step('is reachable by keyboard', async () => {
			(select as HTMLSelectElement).blur();
			await userEvent.tab();
			await expect(select).toHaveFocus();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Choose a seating preference.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Seating preference</Label>
			<Select {...props as RootProps}>
				<option value="indoor">Indoor</option>
				<option value="patio">Patio</option>
				<option value="bar">Bar</option>
			</Select>
			<Field.Error />
		</Field>
	{/snippet}
</Story>

<Story
	name="Invalid"
	args={{ invalid: true }}
	parameters={{
		docs: {
			source: {
				code: `<Field errors={['Choose a seating preference.']}>
	<Label>Seating preference</Label>
	<Select>
		<option value="indoor">Indoor</option>
		<option value="patio">Patio</option>
		<option value="bar">Bar</option>
	</Select>
	<Field.Error />
</Field>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		const select = canvas.getByLabelText('Seating preference');

		await step('is marked invalid for assistive tech', async () => {
			await expect(select).toHaveAttribute('aria-invalid', 'true');
		});

		await step('shows the error message', async () => {
			await expect(canvas.getByText('Choose a seating preference.')).toBeVisible();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Choose a seating preference.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Seating preference</Label>
			<Select {...props as RootProps}>
				<option value="indoor">Indoor</option>
				<option value="patio">Patio</option>
				<option value="bar">Bar</option>
			</Select>
			<Field.Error />
		</Field>
	{/snippet}
</Story>

<Story
	name="Disabled"
	args={{ disabled: true }}
	parameters={{
		docs: {
			source: {
				code: `<Field disabled>
	<Label>Seating preference</Label>
	<Select>
		<option value="indoor">Indoor</option>
		<option value="patio">Patio</option>
		<option value="bar">Bar</option>
	</Select>
</Field>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const select = canvas.getByLabelText('Seating preference');

		await step('is marked disabled for assistive tech', async () => {
			await expect(select).toBeDisabled();
		});

		await step('is skipped by Tab order', async () => {
			(select as HTMLSelectElement).blur();
			await userEvent.tab();
			await expect(select).not.toHaveFocus();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Choose a seating preference.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Seating preference</Label>
			<Select {...props as RootProps}>
				<option value="indoor">Indoor</option>
				<option value="patio">Patio</option>
				<option value="bar">Bar</option>
			</Select>
		</Field>
	{/snippet}
</Story>

<Story
	name="Multiple"
	args={{ multiple: true }}
	parameters={{
		docs: {
			source: {
				code: `<Field>
	<Label>Favorite fruits</Label>
	<Select multiple>
		<option value="apple">Apple</option>
		<option value="banana">Banana</option>
		<option value="cherry">Cherry</option>
	</Select>
</Field>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const select = canvas.getByLabelText('Favorite fruits') as HTMLSelectElement;

		await step('allows selecting more than one option', async () => {
			await expect(select).toHaveAttribute('multiple');
			await userEvent.selectOptions(select, ['apple', 'cherry']);
			await expect(Array.from(select.selectedOptions).map((o) => o.value)).toEqual([
				'apple',
				'cherry'
			]);
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Choose a seating preference.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Favorite fruits</Label>
			<Select {...props as RootProps}>
				<option value="apple">Apple</option>
				<option value="banana">Banana</option>
				<option value="cherry">Cherry</option>
			</Select>
		</Field>
	{/snippet}
</Story>

<Story
	name="Focus Visible"
	tags={['!dev', '!autodocs']}
	play={async ({ canvas, userEvent, step }) => {
		const select = canvas.getByLabelText('Seating preference');

		await step('shows a visible focus ring after keyboard navigation', async () => {
			(select as HTMLSelectElement).blur();
			await userEvent.tab();
			await expect(select).toHaveFocus();
			const styles = getComputedStyle(select);
			await expect(styles.outlineStyle === 'none' && styles.boxShadow === 'none').toBe(false);
		});
	}}
>
	{#snippet template(props)}
		<Field class="grid w-full max-w-sm gap-2">
			<Label>Seating preference</Label>
			<Select {...props as RootProps}>
				<option value="indoor">Indoor</option>
				<option value="patio">Patio</option>
				<option value="bar">Bar</option>
			</Select>
		</Field>
	{/snippet}
</Story>

<Story
	name="States"
	parameters={{
		docs: {
			source: {
				code: `<Field>
	<Label>Default</Label>
	<Select>
		<option value="indoor">Indoor</option>
		<option value="patio">Patio</option>
	</Select>
</Field>

<Field errors={['Choose a seating preference.']}>
	<Label>Invalid</Label>
	<Select>
		<option value="indoor">Indoor</option>
		<option value="patio">Patio</option>
	</Select>
	<Field.Error />
</Field>

<Field disabled>
	<Label>Disabled</Label>
	<Select>
		<option value="indoor">Indoor</option>
		<option value="patio">Patio</option>
	</Select>
</Field>

<Field disabled errors={['Choose a seating preference.']}>
	<Label>Disabled + Invalid</Label>
	<Select>
		<option value="indoor">Indoor</option>
		<option value="patio">Patio</option>
	</Select>
	<Field.Error />
</Field>`
			}
		}
	}}
>
	{#snippet template()}
		<div class="grid w-full max-w-sm gap-6">
			<Field>
				<Label>Default</Label>
				<Select>
					<option value="indoor">Indoor</option>
					<option value="patio">Patio</option>
				</Select>
			</Field>
			<Field errors={['Choose a seating preference.']}>
				<Label>Invalid</Label>
				<Select>
					<option value="indoor">Indoor</option>
					<option value="patio">Patio</option>
				</Select>
				<Field.Error />
			</Field>
			<Field disabled>
				<Label>Disabled</Label>
				<Select>
					<option value="indoor">Indoor</option>
					<option value="patio">Patio</option>
				</Select>
			</Field>
			<Field disabled errors={['Choose a seating preference.']}>
				<Label>Disabled + Invalid</Label>
				<Select>
					<option value="indoor">Indoor</option>
					<option value="patio">Patio</option>
				</Select>
				<Field.Error />
			</Field>
		</div>
	{/snippet}
</Story>
