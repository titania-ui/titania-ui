<script lang="ts" module>
	import { Field, Label, Textarea } from '#lib';
	import type { ToolingProps } from '#lib/types/props.js';
	import type { RootCfg, RootProps } from './index.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Textarea>({
		title: 'Components/Forms/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: ['invalid', 'disabled', 'placeholder', 'rows']
			},
			docs: {
				description: {
					component: 'A multi-line text field for collecting longer, free-form user input'
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
			placeholder: {
				control: { type: 'text' },
				type: 'string',
				table: {
					category: 'Behavior',
					type: { summary: 'string' },
					defaultValue: { summary: 'undefined' }
				}
			},
			rows: {
				control: { type: 'number' },
				type: 'number',
				table: {
					category: 'Behavior',
					type: { summary: 'number' },
					defaultValue: { summary: 'undefined' }
				}
			}
		}
	});
</script>

<Story
	name="Default"
	args={{ placeholder: "If you're celebrating something, let us know.", rows: 4 }}
	parameters={{
		docs: {
			source: {
				code: `<Field>\n\t<Label>Special requests</Label>\n\t<Textarea rows={4} placeholder="If you're celebrating something, let us know." />\n</Field>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const textarea = canvas.getByLabelText('Special requests');

		await step('renders as a native, enabled text area', async () => {
			await expect(textarea).toBeVisible();
			await expect(textarea).toBeEnabled();
			await expect(textarea.tagName).toBe('TEXTAREA');
		});

		await step('accepts multi-line typed input', async () => {
			await userEvent.type(textarea, 'Line one{enter}Line two');
			await expect(textarea).toHaveValue('Line one\nLine two');
		});

		await step('is reachable by keyboard', async () => {
			await userEvent.clear(textarea);
			textarea.blur();
			await userEvent.tab();
			await expect(textarea).toHaveFocus();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Keep requests under 200 characters.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Special requests</Label>
			<Textarea {...props as RootProps} />
			<Field.Error />
		</Field>
	{/snippet}
</Story>

<Story
	name="Invalid"
	args={{
		placeholder: "If you're celebrating something, let us know.",
		rows: 4,
		invalid: true
	}}
	parameters={{
		docs: {
			source: {
				code: `<Field errors={['Keep requests under 200 characters.']}>\n\t<Label>Special requests</Label>\n\t<Textarea rows={4} placeholder="If you're celebrating something, let us know." />\n\t<Field.Error />\n</Field>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		const textarea = canvas.getByLabelText('Special requests');

		await step('is marked invalid for assistive tech', async () => {
			await expect(textarea).toHaveAttribute('aria-invalid', 'true');
		});

		await step('shows the error message', async () => {
			await expect(canvas.getByText('Keep requests under 200 characters.')).toBeVisible();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Keep requests under 200 characters.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Special requests</Label>
			<Textarea {...props as RootProps} />
			<Field.Error />
		</Field>
	{/snippet}
</Story>

<Story
	name="Disabled"
	args={{
		placeholder: "If you're celebrating something, let us know.",
		rows: 4,
		disabled: true
	}}
	parameters={{
		docs: {
			source: {
				code: `<Field disabled>\n\t<Label>Special requests</Label>\n\t<Textarea rows={4} placeholder="If you're celebrating something, let us know." />\n</Field>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const textarea = canvas.getByLabelText('Special requests');

		await step('is marked disabled for assistive tech', async () => {
			await expect(textarea).toBeDisabled();
		});

		await step('ignores typed input', async () => {
			await userEvent.type(textarea, 'Hello');
			await expect(textarea).toHaveValue('');
		});

		await step('is skipped by Tab order', async () => {
			textarea.blur();
			await userEvent.tab();
			await expect(textarea).not.toHaveFocus();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Keep requests under 200 characters.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Special requests</Label>
			<Textarea {...props as RootProps} />
		</Field>
	{/snippet}
</Story>

<Story
	name="Focus Visible"
	tags={['!dev', '!autodocs']}
	args={{ placeholder: "If you're celebrating something, let us know." }}
	play={async ({ canvas, userEvent, step }) => {
		const textarea = canvas.getByLabelText('Special requests');

		await step('shows a visible focus ring after keyboard navigation', async () => {
			textarea.blur();
			await userEvent.tab();
			await expect(textarea).toHaveFocus();
			const styles = getComputedStyle(textarea);
			await expect(styles.outlineStyle === 'none' && styles.boxShadow === 'none').toBe(false);
		});
	}}
>
	{#snippet template(props)}
		<Field class="grid w-full max-w-sm gap-2">
			<Label>Special requests</Label>
			<Textarea {...props as RootProps} />
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
	<Textarea placeholder="Tell us more..." />
</Field>

<Field errors={['Keep requests under 200 characters.']}>
	<Label>Invalid</Label>
	<Textarea placeholder="Tell us more..." />
	<Field.Error />
</Field>

<Field disabled>
	<Label>Disabled</Label>
	<Textarea placeholder="Tell us more..." />
</Field>

<Field disabled errors={['Keep requests under 200 characters.']}>
	<Label>Disabled + Invalid</Label>
	<Textarea placeholder="Tell us more..." />
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
				<Textarea placeholder="Tell us more..." />
			</Field>
			<Field errors={['Keep requests under 200 characters.']}>
				<Label>Invalid</Label>
				<Textarea placeholder="Tell us more..." />
				<Field.Error />
			</Field>
			<Field disabled>
				<Label>Disabled</Label>
				<Textarea placeholder="Tell us more..." />
			</Field>
			<Field disabled errors={['Keep requests under 200 characters.']}>
				<Label>Disabled + Invalid</Label>
				<Textarea placeholder="Tell us more..." />
				<Field.Error />
			</Field>
		</div>
	{/snippet}
</Story>
