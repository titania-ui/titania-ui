<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Input, Field, Label } from '#lib';
	import { expect } from 'storybook/test';
	import { capitalize } from '#lib/utils/capitalize.js';
	import type { ToolingProps } from '#lib/types/props.js';
	import type { RootCfg, RootProps } from './index.js';
	import type { Snippet } from 'svelte';

	const INPUT_TYPES = [
		'text',
		'email',
		'password',
		'number',
		'tel',
		'url',
		'search',
		'date'
	] as const;

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Input>({
		title: 'Components/Forms/Input',
		component: Input,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: ['invalid', 'disabled', 'type', 'placeholder']
			},
			docs: {
				description: {
					component: 'A single-line text field for collecting short, free-form user input'
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
			type: {
				control: {
					type: 'select',
					labels: Object.fromEntries(INPUT_TYPES.map((t) => [t, capitalize(t)]))
				},
				type: 'string',
				table: {
					category: 'Behavior',
					type: { summary: INPUT_TYPES.map((t) => `'${t}'`).join(' | ') },
					defaultValue: { summary: "'text'" }
				},
				options: [...INPUT_TYPES]
			},
			placeholder: {
				control: { type: 'text' },
				type: 'string',
				table: {
					category: 'Behavior',
					type: { summary: 'string' },
					defaultValue: { summary: 'undefined' }
				}
			}
		}
	});
</script>

<Story
	name="Default"
	args={{ type: 'email', placeholder: 'you@example.com' }}
	parameters={{
		docs: {
			source: {
				code: `<Field>\n\t<Label>Email address</Label>\n\t<Input type="email" placeholder="you@example.com" />\n</Field>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const input = canvas.getByLabelText('Email address');

		await step('renders as a native, enabled text field', async () => {
			await expect(input).toBeVisible();
			await expect(input).toBeEnabled();
			await expect(input.tagName).toBe('INPUT');
			await expect(input).toHaveAttribute('type', 'email');
		});

		await step('accepts typed input', async () => {
			await userEvent.type(input, 'hello@example.com');
			await expect(input).toHaveValue('hello@example.com');
		});

		await step('is reachable by keyboard', async () => {
			await userEvent.clear(input);
			input.blur();
			await userEvent.tab();
			await expect(input).toHaveFocus();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Enter a valid email address.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Email address</Label>
			<Input {...props as RootProps} />
			<Field.Error />
		</Field>
	{/snippet}
</Story>

<Story
	name="Invalid"
	args={{ type: 'email', placeholder: 'you@example.com', invalid: true }}
	parameters={{
		docs: {
			source: {
				code: `<Field errors={['Enter a valid email address.']}>\n\t<Label>Email address</Label>\n\t<Input type="email" placeholder="you@example.com" />\n\t<Field.Error />\n</Field>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		const input = canvas.getByLabelText('Email address');

		await step('is marked invalid for assistive tech', async () => {
			await expect(input).toHaveAttribute('aria-invalid', 'true');
		});

		await step('shows the error message', async () => {
			await expect(canvas.getByText('Enter a valid email address.')).toBeVisible();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Enter a valid email address.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Email address</Label>
			<Input {...props as RootProps} />
			<Field.Error />
		</Field>
	{/snippet}
</Story>

<Story
	name="Disabled"
	args={{ type: 'email', placeholder: 'you@example.com', disabled: true }}
	parameters={{
		docs: {
			source: {
				code: `<Field disabled>\n\t<Label>Email address</Label>\n\t<Input type="email" placeholder="you@example.com" />\n</Field>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const input = canvas.getByLabelText('Email address');

		await step('is marked disabled for assistive tech', async () => {
			await expect(input).toBeDisabled();
		});

		await step('ignores typed input', async () => {
			await userEvent.type(input, 'hello@example.com');
			await expect(input).toHaveValue('');
		});

		await step('is skipped by Tab order', async () => {
			input.blur();
			await userEvent.tab();
			await expect(input).not.toHaveFocus();
		});
	}}
>
	{#snippet template(props)}
		<Field
			disabled={Boolean(props.disabled)}
			errors={props.invalid ? ['Enter a valid email address.'] : []}
			class="grid w-full max-w-sm gap-2"
		>
			<Label>Email address</Label>
			<Input {...props as RootProps} />
		</Field>
	{/snippet}
</Story>

<Story
	name="Focus Visible"
	tags={['!dev', '!autodocs']}
	args={{ placeholder: 'you@example.com' }}
	play={async ({ canvas, userEvent, step }) => {
		const input = canvas.getByLabelText('Email address');

		await step('shows a visible focus ring after keyboard navigation', async () => {
			input.blur();
			await userEvent.tab();
			await expect(input).toHaveFocus();
			const styles = getComputedStyle(input);
			await expect(styles.outlineStyle === 'none' && styles.boxShadow === 'none').toBe(false);
		});
	}}
>
	{#snippet template(props)}
		<Field class="grid w-full max-w-sm gap-2">
			<Label>Email address</Label>
			<Input {...props as RootProps} />
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
	<Input placeholder="you@example.com" />
</Field>

<Field errors={['Enter a valid email address.']}>
	<Label>Invalid</Label>
	<Input placeholder="you@example.com" />
	<Field.Error />
</Field>

<Field disabled>
	<Label>Disabled</Label>
	<Input placeholder="you@example.com" />
</Field>

<Field disabled errors={['Enter a valid email address.']}>
	<Label>Disabled + Invalid</Label>
	<Input placeholder="you@example.com" />
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
				<Input placeholder="you@example.com" />
			</Field>
			<Field errors={['Enter a valid email address.']}>
				<Label>Invalid</Label>
				<Input placeholder="you@example.com" />
				<Field.Error />
			</Field>
			<Field disabled>
				<Label>Disabled</Label>
				<Input placeholder="you@example.com" />
			</Field>
			<Field disabled errors={['Enter a valid email address.']}>
				<Label>Disabled + Invalid</Label>
				<Input placeholder="you@example.com" />
				<Field.Error />
			</Field>
		</div>
	{/snippet}
</Story>
