<script lang="ts" module>
	import { Button, ButtonGroup } from '#lib';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Components/Button/ButtonGroup',
		component: ButtonGroup,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: { include: [...ButtonGroup.theme.variantKeys] },
			docs: {
				description: { component: 'Joins a set of related buttons into a single segmented control' }
			}
		},
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: Object.keys(ButtonGroup.theme.variants.orientation),
				table: { category: 'Appearance', defaultValue: { summary: 'horizontal' } }
			}
		}
	});
</script>

<Story
	name="Default"
	args={{ orientation: 'horizontal' }}
	play={async ({ canvas }) => {
		const group = canvas.getByRole('group');
		await expect(group).toBeVisible();
		await expect(canvas.getAllByRole('button')).toHaveLength(3);
	}}
>
	{#snippet template(args)}
		<ButtonGroup {...args}>
			<Button variant="tertiary">Profile</Button>
			<Button variant="tertiary">Settings</Button>
			<Button variant="tertiary">Messages</Button>
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Vertical" args={{ orientation: 'vertical' }}>
	{#snippet template(args)}
		<ButtonGroup {...args}>
			<Button variant="tertiary">Profile</Button>
			<Button variant="tertiary">Settings</Button>
			<Button variant="tertiary">Messages</Button>
		</ButtonGroup>
	{/snippet}
</Story>
