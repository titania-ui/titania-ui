<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button, Icon, Spinner } from '#lib';
	import { expect, fn } from 'storybook/test';
	import { capitalize } from '#lib/utils/capitalize.js';
	import type { ToolingProps } from '#lib/types/props.js';
	import type { RootCfg } from './index.ts';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Button>({
		title: 'Components/Button/Button',
		component: Button,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: ['disabled', 'href', ...Button.theme.variantKeys]
			},
			docs: {
				description: {
					component: 'A single interactive element used for the primary actions a user can take'
				},
				source: {
					transform: (code: string) =>
						code.replace(/\s+onclick=\{[^}]*\}/g, '').replace(/\n{3,}/g, '\n\n')
				}
			}
		},
		argTypes: {
			disabled: {
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
			href: {
				control: {
					type: 'text'
				},
				type: 'string',
				table: {
					category: 'Behavior',
					type: { summary: 'string' },
					defaultValue: { summary: 'undefined' }
				}
			},
			size: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Button.theme.variants.size).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Button.theme.variants.size)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: 'undefined' }
				},
				options: Object.keys(Button.theme.variants.size)
			},
			color: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Button.theme.variants.color).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Button.theme.variants.color)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: 'undefined' }
				},
				options: Object.keys(Button.theme.variants.color)
			},
			variant: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Button.theme.variants.variant).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Button.theme.variants.variant)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: 'undefined' }
				},
				options: Object.keys(Button.theme.variants.variant)
			}
		}
	});
</script>

<Story
	name="Default"
	args={{
		onclick: fn()
	}}
	play={async ({ canvas, userEvent, args, step }) => {
		const button = canvas.getByRole('button');

		await step('renders as a native, enabled button', async () => {
			await expect(button).toBeVisible();
			await expect(button).toBeEnabled();
			await expect(button.tagName).toBe('BUTTON');
		});

		await step('responds to mouse click', async () => {
			await userEvent.click(button);
			await expect(args.onclick).toHaveBeenCalledTimes(1);
		});

		await step('is reachable and activatable by keyboard', async () => {
			button.blur();
			await userEvent.tab();
			await expect(button).toHaveFocus();

			await userEvent.keyboard('{Enter}');
			await expect(args.onclick).toHaveBeenCalledTimes(2);

			await userEvent.keyboard(' ');
			await expect(args.onclick).toHaveBeenCalledTimes(3);
		});
	}}
>
	Button
</Story>

<Story
	name="Disabled"
	args={{
		onclick: fn(),
		disabled: true
	}}
	play={async ({ canvas, userEvent, args, step }) => {
		const button = canvas.getByRole('button');

		await step('is marked disabled for assistive tech', async () => {
			await expect(button).toBeDisabled();
		});

		await step('ignores mouse click', async () => {
			await userEvent.click(button);
			await expect(args.onclick).not.toHaveBeenCalled();
		});

		await step('is skipped by Tab order', async () => {
			button.blur();
			await userEvent.tab();
			await expect(button).not.toHaveFocus();
		});
	}}
>
	Button (Disabled)
</Story>

<Story
	name="As Link"
	args={{
		onclick: fn(),
		href: '#storybook-anchor'
	}}
	play={async ({ canvas, userEvent, args, step }) => {
		const link = canvas.getByRole('link');

		await step('renders as an anchor with the given href', async () => {
			await expect(link).toBeVisible();
			await expect(link).toHaveAttribute('href', '#storybook-anchor');
		});

		await step('still fires onclick like a regular action', async () => {
			await userEvent.click(link);
			await expect(args.onclick).toHaveBeenCalledTimes(1);
		});

		await step('is reachable by keyboard and activatable with Enter', async () => {
			link.blur();
			await userEvent.tab();
			await expect(link).toHaveFocus();

			await userEvent.keyboard('{Enter}');
			await expect(args.onclick).toHaveBeenCalledTimes(2);
		});
	}}
>
	Button (Link)
</Story>

<Story
	name="Disabled As Link"
	tags={['!dev', '!autodocs']}
	args={{
		onclick: fn(),
		href: '#storybook-anchor',
		disabled: true
	}}
	play={async ({ canvas, userEvent, args, step }) => {
		const link = canvas.getByRole('link');

		await step('communicates disabled state via aria-disabled', async () => {
			await expect(link).toHaveAttribute('aria-disabled', 'true');
		});

		await step('does not fire onclick when clicked', async () => {
			await userEvent.click(link);
			await expect(args.onclick).not.toHaveBeenCalled();
		});
	}}
>
	Button (Link)
</Story>

<Story
	name="Focus Visible"
	tags={['!dev', '!autodocs']}
	args={{
		onclick: fn()
	}}
	play={async ({ canvas, userEvent, step }) => {
		const button = canvas.getByRole('button');

		await step('shows a visible focus ring after keyboard navigation', async () => {
			button.blur();
			await userEvent.tab();
			await expect(button).toHaveFocus();
			const styles = getComputedStyle(button);
			await expect(styles.outlineStyle === 'none' && styles.boxShadow === 'none').toBe(false);
		});
	}}
>
	Focus Me
</Story>

<Story
	name="Pending"
	args={{
		onclick: fn()
	}}
>
	{#snippet template()}
		{let pending = $state(false)}
		<Button
			{pending}
			onclick={async () => {
				pending = true;
				await new Promise((r) => setTimeout(r, 1000));
				pending = false;
			}}
		>
			{#snippet children({ pending })}
				{#if pending}
					<Spinner />
					Loading...
				{:else}
					<Icon icon="icon-[flowbite--search-outline]" />
					Button
				{/if}
			{/snippet}
		</Button>
	{/snippet}
</Story>

<Story
	name="Icon Only"
	args={{
		onclick: fn(),
		'aria-label': 'Download file'
	}}
	play={async ({ canvas, userEvent, args, step }) => {
		await step('exposes an accessible name via aria-label, not visible text', async () => {
			const button = canvas.getByRole('button', { name: 'Download file' });
			await expect(button).toBeVisible();
		});

		await step('the icon itself is hidden from the accessibility tree', async () => {
			const icon = canvas.getByTestId('button-icon');
			if (icon) {
				await expect(icon).toHaveAttribute('aria-hidden', 'true');
			}
		});

		await step('remains clickable', async () => {
			const button = canvas.getByRole('button', { name: 'Download file' });
			await userEvent.click(button);
			await expect(args.onclick).toHaveBeenCalledTimes(1);
		});
	}}
>
	<Icon icon="icon-[flowbite--arrow-down-to-bracket-outline]" data-testid="button-icon" />
</Story>

<Story
	name="Sizes"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Button.theme.variants.size)
					.map((size) => `<Button size="${size}">${capitalize(size)}</Button>`)
					.join('\n')
			}
		}
	}}
>
	{#snippet template({ props })}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Button.theme.variants.size) as size (size)}
				<Button {...props} {size}>{capitalize(size)}</Button>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="With Icon"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Button.theme.variants.size)
					.map(
						(size) =>
							`<Button size="${size}">\n\t<Icon icon="icon-[flowbite--arrow-down-to-bracket-outline]" />\n\t${capitalize(size)}\n</Button>`
					)
					.join('\n')
			}
		}
	}}
>
	{#snippet template({ props })}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Button.theme.variants.size) as size (size)}
				<Button {...props} {size}
					><Icon icon="icon-[flowbite--arrow-down-to-bracket-outline]" />{capitalize(size)}</Button
				>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="Variants"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Button.theme.variants.variant)
					.map((variant) => `<Button variant="${variant}">${capitalize(variant)}</Button>`)
					.join('\n')
			}
		}
	}}
>
	{#snippet template({ props })}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Button.theme.variants.variant) as variant (variant)}
				<Button {...props} {variant}>{capitalize(variant)}</Button>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="Colors"
	parameters={{
		docs: {
			source: {
				code: Object.keys(Button.theme.variants.color)
					.map((color) => `<Button color="${color}">${capitalize(color)}</Button>`)
					.join('\n')
			}
		}
	}}
>
	{#snippet template({ props })}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Button.theme.variants.color) as color (color)}
				<Button {...props} {color}>{capitalize(color)}</Button>
			{/each}
		</div>
	{/snippet}
</Story>
