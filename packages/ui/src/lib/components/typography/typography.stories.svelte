<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Heading, Text, Strong, Code, Link, Icon } from '#lib';
	import { expect } from 'storybook/test';
	import type { ToolingProps } from '#lib/types/props.js';
	import type { RootCfg } from './heading.js';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Heading>({
		title: 'Components/Typography/Typography',
		component: Heading,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: ['level']
			},
			docs: {
				description: {
					component: 'The building blocks for the page'
				}
			}
		},
		argTypes: {
			level: {
				control: {
					type: 'select',
					labels: {
						1: 'Heading 1',
						2: 'Heading 2',
						3: 'Heading 3',
						4: 'Heading 4',
						5: 'Heading 5',
						6: 'Heading 6'
					}
				},
				type: 'number',
				table: {
					category: 'Appearance',
					type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
					defaultValue: { summary: '1' }
				},
				options: [1, 2, 3, 4, 5, 6]
			}
		}
	});
</script>

<Story
	name="Heading"
	args={{ level: 1 }}
	parameters={{
		docs: {
			source: {
				code: `<Heading level={1}>Page title</Heading>`
			}
		}
	}}
	play={async ({ canvas, args, step }) => {
		await step('renders with the matching semantic tag, role, and aria-level', async () => {
			const heading = canvas.getByRole('heading', { level: args.level as number });
			await expect(heading).toBeVisible();
			await expect(heading.tagName).toBe(`H${args.level}`);
		});
	}}
>
	{#snippet template(props)}
		<Heading {...props}>Page title</Heading>
	{/snippet}
</Story>

<Story
	name="Heading Levels"
	tags={['!dev']}
	parameters={{
		docs: {
			source: {
				code: [1, 2, 3, 4, 5, 6]
					.map((level) => `<Heading level={${level}}>Heading level ${level}</Heading>`)
					.join('\n')
			}
		}
	}}
>
	{#snippet template()}
		<div class="space-y-4">
			<Heading level={1}>Heading level 1</Heading>
			<Heading level={2}>Heading level 2</Heading>
			<Heading level={3}>Heading level 3</Heading>
			<Heading level={4}>Heading level 4</Heading>
			<Heading level={5}>Heading level 5</Heading>
			<Heading level={6}>Heading level 6</Heading>
		</div>
	{/snippet}
</Story>

<Story
	name="Text"
	parameters={{
		docs: {
			source: {
				code: `<Text>\n\tLorem ipsum dolor sit amet consectetur adipisicing elit. Beatae libero sed eligendi\n\tpariatur eum mollitia qui deleniti ipsam doloremque assumenda.\n</Text>`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		await step('renders as a paragraph', async () => {
			const text = canvas.getByText(/Lorem ipsum/);
			await expect(text).toBeVisible();
			await expect(text.tagName).toBe('P');
		});
	}}
>
	{#snippet template()}
		<Text class="max-w-sm">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae libero sed eligendi pariatur
			eum mollitia qui deleniti ipsam doloremque assumenda.
		</Text>
	{/snippet}
</Story>

<Story
	name="Strong"
	parameters={{
		docs: {
			source: { code: `<Text>Your trial ends in <Strong>3 days</Strong>.</Text>` }
		}
	}}
	play={async ({ canvas, step }) => {
		await step('renders as inline, semantically strong text', async () => {
			const strong = canvas.getByText('3 days');
			await expect(strong).toBeVisible();
			await expect(strong.tagName).toBe('STRONG');
		});
	}}
>
	{#snippet template()}
		<Text>Your trial ends in <Strong>3 days</Strong>.</Text>
	{/snippet}
</Story>

<Story
	name="Code"
	parameters={{
		docs: {
			source: { code: `<Text>Run <Code>npm install</Code> to get started.</Text>` }
		}
	}}
	play={async ({ canvas, step }) => {
		await step('renders as inline code', async () => {
			const code = canvas.getByText('npm install');
			await expect(code).toBeVisible();
			await expect(code.tagName).toBe('CODE');
		});
	}}
>
	{#snippet template()}
		<Text>Run <Code>npm install</Code> to get started.</Text>
	{/snippet}
</Story>

<Story
	name="Links"
	parameters={{
		docs: {
			source: {
				code: `<Link href="/docs">Enabled link</Link>\n<Link href="/docs" disabled>Disabled link</Link>`
			}
		}
	}}
	play={async ({ canvas, userEvent, step }) => {
		const enabledLink = canvas.getByRole('link', { name: 'Enabled link' });
		const disabledLink = canvas.getByRole('link', { name: 'Disabled link' });

		await step('renders as an anchor with the given href', async () => {
			await expect(enabledLink).toBeVisible();
			await expect(enabledLink).toHaveAttribute('href', '#storybook-anchor');
		});

		await step('is reachable by keyboard', async () => {
			enabledLink.blur();
			await userEvent.tab();
			await expect(enabledLink).toHaveFocus();
		});

		await step('communicates the disabled state via aria-disabled', async () => {
			await expect(disabledLink).toHaveAttribute('aria-disabled', 'true');
		});
	}}
>
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-6">
			<Link href="#storybook-anchor">Enabled link</Link>
			<Link href="#storybook-anchor" disabled>Disabled link</Link>
		</div>
	{/snippet}
</Story>

<Story
	name="Icon"
	parameters={{
		docs: {
			source: {
				code: `<Icon icon="icon-[flowbite--star-solid]" />`
			}
		}
	}}
	play={async ({ canvas, step }) => {
		const icon = canvas.getByTestId('icon');

		await step('is decorative and hidden from the accessibility tree', async () => {
			await expect(icon).toHaveAttribute('role', 'img');
			await expect(icon).toHaveAttribute('aria-hidden', 'true');
		});
	}}
>
	{#snippet template()}
		<div class="flex flex-wrap items-center justify-center gap-4 text-2xl">
			<Icon icon="icon-[flowbite--star-solid]" data-testid="icon" />
			<Icon icon="icon-[flowbite--bell-solid]" />
			<Icon icon="icon-[flowbite--heart-solid]" />
			<Icon icon="icon-[flowbite--check-circle-solid]" />
		</div>
	{/snippet}
</Story>

<Story name="Usage" tags={['!dev']}>
	{#snippet template()}
		<div class="max-w-sm space-y-4">
			<Heading level={2}>Release notes</Heading>
			<Text>
				We shipped <Strong>dark mode</Strong> support this week. Run <Code>npm update</Code> to pick up
				the change, then read the
				<Link href="#storybook-anchor">full changelog</Link> for details.
			</Text>
		</div>
	{/snippet}
</Story>
