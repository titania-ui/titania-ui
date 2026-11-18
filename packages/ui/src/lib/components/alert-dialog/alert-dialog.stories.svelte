<script lang="ts" module>
	import { AlertDialog, Button, Icon, Text } from '#lib';
	import { capitalize } from '#lib/utils/capitalize.js';
	import type { Status } from './index.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Components/Feedback/AlertDialog',
		component: AlertDialog,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: { include: ['status'] },
			docs: {
				description: {
					component:
						'A modal dialog that interrupts the user to confirm an important or destructive action. Built on the bits-ui AlertDialog, composed from Button and CloseButton'
				}
			}
		},
		argTypes: {
			status: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(AlertDialog.theme.variants.status).map((v) => [v, capitalize(v)])
					)
				},
				options: Object.keys(AlertDialog.theme.variants.status),
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(AlertDialog.theme.variants.status)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: 'default' }
				}
			}
		}
	});

	const EXAMPLES: {
		status: Status;
		trigger: string;
		title: string;
		body: string;
		cancel: string;
		confirm: string;
	}[] = [
		{
			status: 'accent',
			trigger: 'Sign Out',
			title: 'Sign out of your account?',
			body: "You'll need to sign in again to access your account. Any unsaved changes will be lost.",
			cancel: 'Stay Signed In',
			confirm: 'Sign Out'
		},
		{
			status: 'success',
			trigger: 'Complete Task',
			title: 'Complete this task?',
			body: 'This will mark the task as complete and notify all team members.',
			cancel: 'Not Yet',
			confirm: 'Mark Complete'
		},
		{
			status: 'warning',
			trigger: 'Discard Changes',
			title: 'Discard unsaved changes?',
			body: 'You have unsaved changes that will be permanently lost.',
			cancel: 'Keep Editing',
			confirm: 'Discard'
		},
		{
			status: 'danger',
			trigger: 'Delete Account',
			title: 'Delete your account?',
			body: 'This will permanently delete your account and remove all your data from our servers. This action is irreversible.',
			cancel: 'Cancel',
			confirm: 'Delete Account'
		}
	];

	const onConfirm = fn();
	const onCancel = fn();

	// The dialog is portalled to <body>, outside the story canvas
	const page = () => within(document.body);
	const dialog = () => page().findByRole('alertdialog');
	const isClosed = () =>
		waitFor(() => expect(page().queryByRole('alertdialog')).toBeNull(), { timeout: 2000 });
</script>

<script lang="ts">
	let controlledOpen = $state(false);
	let resolveSave: (() => void) | undefined;
	const save = () => new Promise<void>((r) => (resolveSave = r));
</script>

<Story
	name="Default"
	args={{ status: 'danger' }}
	play={async ({ canvas, step }) => {
		onConfirm.mockClear();
		onCancel.mockClear();
		const trigger = canvas.getByRole('button', { name: 'Delete product' });

		await step('trigger is a dialog disclosure', async () => {
			await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
			await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		});

		await step('opens a named and described modal alertdialog', async () => {
			await userEvent.click(trigger);
			const d = await dialog();
			await expect(d).toHaveAttribute('aria-modal', 'true');
			await expect(d).toHaveAccessibleName('Error: Delete this product?');
			await expect(d).toHaveAccessibleDescription(/cannot be undone/);
			await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		});

		await step('focus starts on the least destructive action', async () => {
			await waitFor(() => expect(page().getByRole('button', { name: 'No, cancel' })).toHaveFocus());
		});

		await step('focus is trapped inside the dialog', async () => {
			await userEvent.tab();
			await expect(page().getByRole('button', { name: "Yes, I'm sure" })).toHaveFocus();
			await userEvent.tab();
			await expect(page().getByRole('button', { name: 'Close' })).toHaveFocus();
			await userEvent.tab();
			await expect(page().getByRole('button', { name: 'No, cancel' })).toHaveFocus();
		});

		await step('clicking the backdrop does not dismiss it', async () => {
			await userEvent.click(
				document.querySelector<HTMLElement>('[data-slot="alert-dialog-overlay"]')!
			);
			await expect(await dialog()).toBeVisible();
		});

		await step('Escape cancels and returns focus to the trigger', async () => {
			await userEvent.keyboard('{Escape}');
			await isClosed();
			await expect(onCancel).toHaveBeenCalledOnce();
			await waitFor(() => expect(trigger).toHaveFocus());
		});

		await step('confirming runs onconfirm and closes', async () => {
			await userEvent.click(trigger);
			await userEvent.click(await page().findByRole('button', { name: "Yes, I'm sure" }));
			await expect(onConfirm).toHaveBeenCalledOnce();
			await isClosed();
			await expect(onCancel).toHaveBeenCalledOnce();
		});

		// Leave it open so the a11y scan covers the dialog too
		await userEvent.click(trigger);
		await dialog();
	}}
>
	{#snippet template(args)}
		<AlertDialog {...args} onconfirm={onConfirm} oncancel={onCancel}>
			<AlertDialog.Trigger variant="danger">Delete product</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Close />
				<AlertDialog.Indicator />
				<AlertDialog.Title>Delete this product?</AlertDialog.Title>
				<AlertDialog.Description>
					It will be removed from your account. This cannot be undone.
				</AlertDialog.Description>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>No, cancel</AlertDialog.Cancel>
					<AlertDialog.Action>Yes, I'm sure</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	{/snippet}
</Story>

<Story
	name="Default Actions"
	play={async ({ canvas, step }) => {
		await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
		await dialog();

		await step('an empty footer renders Cancel and Confirm', async () => {
			await expect(page().getByRole('button', { name: 'Cancel' })).toBeVisible();
			await expect(page().getByRole('button', { name: 'Confirm' })).toBeVisible();
		});

		await step('the confirm button follows the status', async () => {
			await expect(page().getByRole('button', { name: 'Confirm' })).toHaveClass(
				/tabutton--variant-primary/
			);
		});
	}}
>
	{#snippet template(args)}
		<AlertDialog {...args}>
			<AlertDialog.Trigger variant="secondary">Open</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Indicator />
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Footer />
			</AlertDialog.Content>
		</AlertDialog>
	{/snippet}
</Story>

<Story name="Status">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			{#each EXAMPLES as ex (ex.status)}
				<AlertDialog status={ex.status}>
					<AlertDialog.Trigger variant={ex.status === 'danger' ? 'danger' : 'secondary'}>
						{ex.trigger}
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Close />
						<AlertDialog.Indicator />
						<AlertDialog.Title>{ex.title}</AlertDialog.Title>
						<AlertDialog.Description>{ex.body}</AlertDialog.Description>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>{ex.cancel}</AlertDialog.Cancel>
							<AlertDialog.Action>{ex.confirm}</AlertDialog.Action>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="Custom Buttons"
	play={async ({ canvas, step }) => {
		await userEvent.click(canvas.getByRole('button', { name: 'Publish' }));
		await dialog();

		await step('Action and Cancel take any Button variant, size and content', async () => {
			const publish = page().getByRole('button', { name: 'Publish now' });
			await expect(publish).toHaveClass(/tabutton--variant-outline/);
			await expect(publish.querySelector('[data-slot="icon"]')).toHaveAttribute(
				'aria-hidden',
				'true'
			);
		});

		await step('a plain Button in the footer works too', async () => {
			await userEvent.click(page().getByRole('button', { name: 'Schedule' }));
			await expect(await dialog()).toBeVisible();
		});
	}}
>
	{#snippet template(args)}
		<AlertDialog {...args} status="accent">
			<AlertDialog.Trigger variant="primary">Publish</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Indicator icon="icon-[flowbite--rocket-outline]" />
				<AlertDialog.Title>Publish this article?</AlertDialog.Title>
				<AlertDialog.Description>It will be visible to everyone right away.</AlertDialog.Description
				>
				<AlertDialog.Footer>
					<AlertDialog.Cancel variant="ghost" size="sm">Not now</AlertDialog.Cancel>
					<Button variant="secondary" size="sm">Schedule</Button>
					<AlertDialog.Action variant="outline" size="sm">
						<Icon icon="icon-[flowbite--rocket-outline]" />
						Publish now
					</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	{/snippet}
</Story>

<Story
	name="Async Confirm"
	play={async ({ canvas, step }) => {
		await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
		await dialog();
		const confirm = page().getByRole('button', { name: 'Overwrite' });

		await step('stays open and pending while onconfirm runs', async () => {
			await userEvent.click(confirm);
			await expect(confirm).toHaveAttribute('aria-disabled', 'true');
			await expect(confirm).toHaveAccessibleName('Overwrite, Loading');
			await expect(page().getByRole('button', { name: 'Cancel' })).toBeDisabled();
		});

		await step('Escape is ignored while pending', async () => {
			await userEvent.keyboard('{Escape}');
			await expect(await dialog()).toBeVisible();
		});

		await step('closes once it resolves', async () => {
			resolveSave?.();
			await isClosed();
		});
	}}
>
	{#snippet template(args)}
		<AlertDialog {...args} status="warning" onconfirm={save}>
			<AlertDialog.Trigger variant="primary">Save</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Indicator />
				<AlertDialog.Title>Overwrite the existing file?</AlertDialog.Title>
				<AlertDialog.Description>A file with this name already exists.</AlertDialog.Description>
				<AlertDialog.Footer>
					<AlertDialog.Cancel />
					<AlertDialog.Action>Overwrite</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	{/snippet}
</Story>

<Story
	name="Controlled"
	play={async ({ canvas, step }) => {
		await step('bind:open opens it without a Trigger', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Open from outside' }));
			await dialog();
		});

		await step('closing writes back to bind:open', async () => {
			await userEvent.click(page().getByRole('button', { name: 'Cancel' }));
			await isClosed();
			await expect(canvas.getByTestId('state')).toHaveTextContent('closed');
		});
	}}
>
	{#snippet template(args)}
		<div class="flex flex-col items-start gap-4">
			<Button variant="secondary" onclick={() => (controlledOpen = true)}>Open from outside</Button>
			<Text data-testid="state">{controlledOpen ? 'open' : 'closed'}</Text>
			<AlertDialog {...args} bind:open={controlledOpen}>
				<AlertDialog.Content>
					<AlertDialog.Title>Leave this page?</AlertDialog.Title>
					<AlertDialog.Footer />
				</AlertDialog.Content>
			</AlertDialog>
		</div>
	{/snippet}
</Story>
