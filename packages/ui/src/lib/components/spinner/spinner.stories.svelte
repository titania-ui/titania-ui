<script lang="ts" module>
	import { Button, Spinner } from '#lib';
	import type { ToolingProps } from '#lib/types/props.js';
	import { capitalize } from '#lib/utils/capitalize.js';
	import type { RootCfg } from './index.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Spinner>({
		title: 'Components/Feedback/Spinner',
		component: Spinner,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: ['color']
			},
			docs: {
				description: {
					component:
						'An animated indicator that communicates an in-progress, indeterminate operation'
				}
			}
		},
		argTypes: {
			color: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Spinner.theme.variants.color).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Spinner.theme.variants.color)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: "'default'" }
				},
				options: Object.keys(Spinner.theme.variants.color)
			}
		}
	});
</script>

<Story
	name="Default"
	play={async ({ canvas, step }) => {
		const spinner = canvas.getByRole('status', { hidden: true });

		await step('renders a decorative, animated status indicator', async () => {
			await expect(spinner).toBeVisible();
			await expect(spinner).toHaveAttribute('aria-hidden', 'true');
			await expect(spinner).toHaveAttribute('aria-label');
		});

		await step('is not part of the tab order', async () => {
			await expect(spinner).not.toHaveAttribute('tabindex');
		});
	}}
/>

<Story
	name="Colors"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Spinner.theme.variants.color)
					.map((color) => `<Spinner color="${color}" />`)
					.join('\n')
			}
		}
	}}
>
	{#snippet template(props)}
		<div class="flex flex-wrap items-center justify-center gap-4 text-2xl">
			{#each Object.keys(Spinner.theme.variants.color) as color (color)}
				<Spinner {...props} color={color as keyof typeof Spinner.theme.variants.color} />
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="In Context"
	parameters={{
		docs: {
			description: {
				story:
					'The spinner is hidden from assistive tech, so real usage always pairs it with visible or accessible text, like inside a pending `Button`.'
			},
			source: {
				code: `<Button disabled>\n\t<Spinner />\n\tLoading...\n</Button>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		await step('the loading state has an accessible name from the visible text', async () => {
			const button = canvas.getByRole('button');
			await expect(button).toBeVisible();
			await expect(button).toBeDisabled();
		});
	}}
>
	{#snippet template()}
		<Button pending>
			<Spinner />
			Loading...
		</Button>
	{/snippet}
</Story>
