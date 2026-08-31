<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Chip, Icon } from '#lib';
	import { capitalize } from '#lib/utils/capitalize.ts';
	import type { ToolingProps } from '#lib/types/props.ts';
	import type { RootCfg } from './index.ts';
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

<Story name="Default"><Chip.Label>Chip</Chip.Label></Story>

<Story name="Dismissible"><Chip.Label>Chip</Chip.Label><Chip.Dismiss /></Story>

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
	{#snippet template({ props })}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Chip.theme.variants.size) as size (size)}
				<Chip {...props} {size}><Chip.Label>{capitalize(size)}</Chip.Label></Chip>
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
	{#snippet template({ props })}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Chip.theme.variants.size) as size (size)}
				<Chip {...props} {size}
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
	{#snippet template({ props })}
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each Object.keys(Chip.theme.variants.color) as color (color)}
				<Chip {...props} {color}><Chip.Label>{capitalize(color)}</Chip.Label></Chip>
			{/each}
		</div>
	{/snippet}
</Story>
