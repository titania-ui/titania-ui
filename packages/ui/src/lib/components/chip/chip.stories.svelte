<script lang="ts" module>
	import { Chip, Icon } from '#lib';
	import type { ToolingProps } from '#lib/types/props.js';
	import { capitalize } from '#lib/utils/capitalize.js';
	import type { RootCfg } from './index.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn } from 'storybook/test';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Chip>({
		title: 'Components/Data Display/Chip',
		component: Chip,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: ['dismissed', 'ondismiss', ...Chip.theme.variantKeys]
			},
			docs: {
				description: {
					component: 'A compact element used to represent a tag, filter, or selection'
				},
				source: {
					transform: (code: string) =>
						code.replace(/\s+ondismiss=\{[^}]*\}/g, '').replace(/\n{3,}/g, '\n\n')
				}
			}
		},
		argTypes: {
			dismissed: {
				control: {
					type: 'boolean'
				},
				type: 'boolean',
				table: {
					category: 'Behavior',
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			ondismiss: {
				control: {
					disable: true
				},
				type: 'function',
				table: {
					category: 'Behavior',
					type: { summary: '() => void' }
				}
			},
			size: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Chip.theme.variants.size).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Chip.theme.variants.size)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: 'undefined' }
				},
				options: Object.keys(Chip.theme.variants.size)
			},
			color: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Chip.theme.variants.color).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Chip.theme.variants.color)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: 'undefined' }
				},
				options: Object.keys(Chip.theme.variants.color)
			}
		}
	});
</script>

<Story
	name="Default"
	play={async ({ canvas, step }) => {
		await step('renders the chip and its label', async () => {
			await expect(canvas.getByText('Chip')).toBeVisible();
		});
	}}
>
	<Chip.Label>Chip</Chip.Label>
</Story>

<Story
	name="Dismissible"
	args={{
		ondismiss: fn()
	}}
	play={async ({ canvas, userEvent, args, step }) => {
		const dismissButton = canvas.getByRole('button', { name: 'Close' });

		await step('renders a labelled dismiss button', async () => {
			await expect(dismissButton).toBeVisible();
		});

		await step('dismiss button responds to mouse click', async () => {
			await userEvent.click(dismissButton);
			await expect(args.ondismiss).toHaveBeenCalledTimes(1);
			await expect(canvas.queryByText('Chip')).not.toBeInTheDocument();
		});
	}}
>
	<Chip.Label>Chip</Chip.Label>
	<Chip.Dismiss />
</Story>

<Story
	name="Dismissed"
	tags={['!dev', '!autodocs']}
	args={{
		dismissed: true,
		ondismiss: fn()
	}}
	play={async ({ canvas, step }) => {
		await step('renders nothing once dismissed is true', async () => {
			await expect(canvas.queryByText('Chip')).not.toBeInTheDocument();
		});
	}}
>
	<Chip.Label>Chip</Chip.Label>
	<Chip.Dismiss />
</Story>

<Story
	name="Focus Visible"
	tags={['!dev', '!autodocs']}
	args={{
		ondismiss: fn()
	}}
	play={async ({ canvas, userEvent, args, step }) => {
		const dismissButton = canvas.getByRole('button', { name: 'Close' });

		await step(
			'shows a visible focus ring on the dismiss button after keyboard navigation',
			async () => {
				dismissButton.blur();
				await userEvent.tab();
				await expect(dismissButton).toHaveFocus();
				const styles = getComputedStyle(dismissButton);
				await expect(styles.outlineStyle === 'none' && styles.boxShadow === 'none').toBe(false);
			}
		);

		await step('is reachable and activatable by keyboard', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(args.ondismiss).toHaveBeenCalledTimes(1);
		});
	}}
>
	<Chip.Label>Focus Me</Chip.Label>
	<Chip.Dismiss />
</Story>

<Story
	name="Sizes"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Chip.theme.variants.size)
					.map((size) => `<Chip size="${size}"><Chip.Label>${capitalize(size)}</Chip.Label></Chip>`)
					.join('\n')
			}
		}
	}}
>
	{#snippet template(props)}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Chip.theme.variants.size) as size (size)}
				<Chip {...props} size={size as keyof typeof Chip.theme.variants.size}
					><Chip.Label>{capitalize(size)}</Chip.Label></Chip
				>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="With Icon"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Chip.theme.variants.size)
					.map(
						(size) =>
							`<Chip size="${size}">\n\t<Icon icon="icon-[flowbite--clock-outline]" />\n\t<Chip.Label>${capitalize(size)}</Chip.Label>\n</Chip>`
					)
					.join('\n')
			}
		}
	}}
>
	{#snippet template(props)}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Chip.theme.variants.size) as size (size)}
				<Chip {...props} size={size as keyof typeof Chip.theme.variants.size}
					><Icon icon="icon-[flowbite--clock-outline]" /><Chip.Label>{capitalize(size)}</Chip.Label
					></Chip
				>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="Colors"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Chip.theme.variants.color)
					.map(
						(color) => `<Chip color="${color}"><Chip.Label>${capitalize(color)}</Chip.Label></Chip>`
					)
					.join('\n')
			}
		}
	}}
>
	{#snippet template(props)}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Chip.theme.variants.color) as color (color)}
				<Chip {...props} color={color as keyof typeof Chip.theme.variants.color}
					><Chip.Label>{capitalize(color)}</Chip.Label></Chip
				>
			{/each}
		</div>
	{/snippet}
</Story>
