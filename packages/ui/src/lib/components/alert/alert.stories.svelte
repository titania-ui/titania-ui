<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Alert, Button, Spinner } from '#lib';
	import { expect, fn } from 'storybook/test';
	import { capitalize } from '#lib/utils/capitalize.js';
	import type { ToolingProps } from '#lib/types/props.js';
	import type { RootCfg } from './index.js';
	import type { Snippet } from 'svelte';

	const { Story } = defineMeta<Snippet<[ToolingProps<RootCfg>, unknown]>, typeof Alert>({
		title: 'Components/Feedback/Alert',
		component: Alert,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: {
				include: ['dismissed', 'ondismiss', ...Alert.theme.variantKeys]
			},
			docs: {
				description: {
					component:
						'A banner used to communicate important, contextual information such as status updates, warnings, or confirmations'
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
			status: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Alert.theme.variants.status).map((v) => [v, capitalize(v)])
					)
				},
				type: 'string',
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Alert.theme.variants.status)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: 'default' }
				},
				options: Object.keys(Alert.theme.variants.status)
			}
		}
	});
</script>

<Story
	name="Default"
	args={{
		ondismiss: fn()
	}}
	play={async ({ canvas, userEvent, args, step }) => {
		const alert = canvas.getByRole('status');

		await step('renders as an alert with title and description', async () => {
			await expect(alert).toBeVisible();
			await expect(canvas.getByText('Title')).toBeVisible();
			await expect(canvas.getByText(/Lorem ipsum dolor sit amet/)).toBeVisible();
		});

		await step('dismiss button responds to mouse click', async () => {
			const dismissButton = canvas.getByRole('button');
			await expect(dismissButton).toBeVisible();
			await userEvent.click(dismissButton);
			await expect(args.ondismiss).toHaveBeenCalledTimes(1);
		});
	}}
>
	<Alert.Indicator />
	<Alert.Title>Title</Alert.Title>
	<Alert.Description>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae libero sed eligendi pariatur eum
		mollitia qui deleniti ipsam doloremque assumenda.
	</Alert.Description>
	<Alert.Dismiss />
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
			await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
		});
	}}
>
	<Alert.Indicator />
	<Alert.Title>Title</Alert.Title>
	<Alert.Description>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae libero sed eligendi pariatur eum
		mollitia qui deleniti ipsam doloremque assumenda.
	</Alert.Description>
	<Alert.Dismiss />
</Story>

<Story
	name="Focus Visible"
	tags={['!dev', '!autodocs']}
	args={{
		ondismiss: fn()
	}}
	play={async ({ canvas, userEvent, step }) => {
		const dismissButton = canvas.getByRole('button');

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
	}}
>
	<Alert.Indicator />
	<Alert.Title>Focus Me</Alert.Title>
	<Alert.Description>Tab to the dismiss button to see the focus ring.</Alert.Description>
	<Alert.Dismiss />
</Story>

<Story name="Status">
	{#snippet template({ props })}
		<div class="space-y-4">
			{#each Object.keys(Alert.theme.variants.status) as status (status)}
				<Alert {...props} {status}>
					<Alert.Title>{capitalize(status)}s</Alert.Title>
					<Alert.Description>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae libero sed eligendi
						pariatur eum mollitia qui deleniti ipsam doloremque assumenda.
					</Alert.Description>
					<Alert.Dismiss />
				</Alert>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Usage">
	{#snippet template()}
		<div class="space-y-4">
			<Alert status="default">
				<Alert.Indicator />
				<Alert.Title>New features available</Alert.Title>
				<Alert.Description>
					Check out our latest updates including dark mode support and improved accessibility
					features.
				</Alert.Description>
			</Alert>
			<Alert status="accent">
				<Alert.Indicator />
				<Alert.Title>Update available</Alert.Title>
				<Alert.Description>
					A new version of the application is available. Please refresh to get the latest features
					and bug fixes.
				</Alert.Description>
				<Button size="xs" variant="primary">Refresh</Button>
			</Alert>
			<Alert status="success">
				<Alert.Indicator />
				<Alert.Title>Payment successful</Alert.Title>
				<Alert.Description>
					Your payment of $49.99 has been processed. A confirmation email has been sent to your
					inbox.
				</Alert.Description>
				<Button size="xs" variant="secondary">View Receipt</Button>
			</Alert>
			<Alert status="warning">
				<Alert.Indicator />
				<Alert.Title>Storage almost full</Alert.Title>
				<Alert.Description>
					You're using 90% of your storage quota. Consider upgrading your plan or removing unused
					files to avoid service interruption.
				</Alert.Description>
				<Button size="xs" variant="secondary">Manage Storage</Button>
			</Alert>
			<Alert status="success">
				<Alert.Indicator />
				<Alert.Title>Profile updated successfully</Alert.Title>
				<Alert.Dismiss />
			</Alert>
			<Alert status="accent">
				<Alert.Indicator as={Spinner} />
				<Alert.Title>Processing your request</Alert.Title>
				<Alert.Description>
					Please wait while we sync your data. This may take a few moments.
				</Alert.Description>
			</Alert>
			<Alert status="warning">
				<Alert.Indicator />
				<Alert.Title>Scheduled maintenance</Alert.Title>
				<Alert.Description>
					Our services will be unavailable on Sunday, March 15th from 2:00 AM to 6:00 AM UTC for
					scheduled maintenance.
				</Alert.Description>
			</Alert>
		</div>
	{/snippet}
</Story>
