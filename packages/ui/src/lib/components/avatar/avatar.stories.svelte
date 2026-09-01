<script lang="ts" module>
	import { Avatar, Icon } from '#lib';
	import type { ToolingProps } from '#lib/types/props.js';
	import { capitalize } from '#lib/utils/capitalize.js';
	import type { RootCfg } from './index.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import type { Snippet } from 'svelte';
	import PHOTO from '../../assets/placeholder_avatar.png';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Avatar>({
		title: 'Components/Media/Avatar',
		component: Avatar,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: [...Avatar.theme.variantKeys]
			},
			docs: {
				description: {
					component: 'A compact visual representation of a person or entity'
				}
			}
		},
		argTypes: {
			size: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Avatar.theme.variants.size).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Avatar.theme.variants.size)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: "'md'" }
				},
				options: Object.keys(Avatar.theme.variants.size)
			},
			color: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Avatar.theme.variants.color).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Avatar.theme.variants.color)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: "'default'" }
				},
				options: Object.keys(Avatar.theme.variants.color)
			}
		}
	});
</script>

<Story
	name="Default"
	parameters={{
		docs: {
			source: {
				code: `<Avatar>\n\t<Avatar.Image src="/avatars/john-doe.jpg" alt="John Doe" />\n</Avatar>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		await step('renders the photo with an accessible name', async () => {
			const image = canvas.getByRole('img', { name: 'John Doe' });
			await expect(image).toBeVisible();
		});
	}}
>
	{#snippet template(props)}
		<Avatar {...props}>
			<Avatar.Image src={PHOTO} alt="John Doe" />
		</Avatar>
	{/snippet}
</Story>

<Story
	name="Fallback"
	parameters={{
		docs: {
			source: {
				code: `<Avatar>\n\t<Avatar.Fallback>JD</Avatar.Fallback>\n</Avatar>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		await step('shows the fallback initials when there is no photo', async () => {
			await expect(canvas.getByText('JD')).toBeVisible();
		});
	}}
>
	{#snippet template(props)}
		<Avatar {...props}>
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar>
	{/snippet}
</Story>

<Story
	name="Fallback Icon"
	parameters={{
		docs: {
			source: {
				code: `<Avatar>\n\t<Avatar.Fallback>\n\t\t<Icon icon="icon-[flowbite--user-solid]" />\n\t</Avatar.Fallback>\n</Avatar>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		await step('the icon fallback is decorative, hidden from the accessibility tree', async () => {
			const icon = canvas.getByTestId('icon');
			await expect(icon).toHaveAttribute('aria-hidden', 'true');
		});
	}}
>
	{#snippet template(props)}
		<Avatar {...props}>
			<Avatar.Fallback>
				<Icon icon="icon-[flowbite--user-solid]" data-testid="icon" />
			</Avatar.Fallback>
		</Avatar>
	{/snippet}
</Story>

<Story
	name="Sizes"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Avatar.theme.variants.size)
					.map(
						(size) =>
							`<Avatar size="${size}">\n\t<Avatar.Image src="/avatars/john-doe.jpg" alt="John Doe" />\n</Avatar>`
					)
					.join('\n')
			}
		}
	}}
>
	{#snippet template(props)}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Avatar.theme.variants.size) as size (size)}
				<Avatar {...props} {size}>
					<Avatar.Image src={PHOTO} alt="John Doe" />
				</Avatar>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="Colors"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Avatar.theme.variants.color)
					.map(
						(color) =>
							`<Avatar color="${color}">\n\t<Avatar.Fallback>JD</Avatar.Fallback>\n</Avatar>`
					)
					.join('\n')
			}
		}
	}}
>
	{#snippet template(props)}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Avatar.theme.variants.color) as color (color)}
				<Avatar {...props} {color}>
					<Avatar.Fallback>JD</Avatar.Fallback>
				</Avatar>
			{/each}
		</div>
	{/snippet}
</Story>
