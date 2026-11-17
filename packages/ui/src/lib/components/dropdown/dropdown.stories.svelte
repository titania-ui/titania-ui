<script lang="ts" module>
	import {
		Avatar,
		Button,
		ButtonGroup,
		Checkbox,
		Chip,
		Dropdown,
		Icon,
		Label,
		Link,
		Strong,
		Switch,
		Text
	} from '#lib';
	import { capitalize } from '#lib/utils/capitalize.js';
	import PHOTO from '../../assets/placeholder_avatar.png';
	import type { Placement } from './index.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, waitFor } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Components/Button/Dropdown',
		component: Dropdown,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			controls: { include: ['placement'] },
			docs: {
				description: {
					component:
						'A Button that discloses a floating panel of links, actions or controls. Built on the native Popover API and CSS anchor positioning'
				}
			}
		},
		argTypes: {
			placement: {
				control: {
					type: 'select',
					labels: Object.fromEntries(
						Object.keys(Dropdown.theme.variants.placement).map((v) => [v, capitalize(v)])
					)
				},
				options: Object.keys(Dropdown.theme.variants.placement),
				table: {
					category: 'Appearance',
					type: {
						summary: Object.keys(Dropdown.theme.variants.placement)
							.map((k) => `'${k}'`)
							.join(' | ')
					},
					defaultValue: { summary: 'bottom-start' }
				}
			}
		}
	});

	const ACCOUNT = [
		{ label: 'Account', icon: 'icon-[flowbite--user-outline]' },
		{ label: 'Settings', icon: 'icon-[flowbite--cog-outline]' },
		{ label: 'Privacy', icon: 'icon-[flowbite--lock-outline]' },
		{ label: 'Notifications', icon: 'icon-[flowbite--bell-outline]' },
		{ label: 'Help center', icon: 'icon-[flowbite--question-circle-outline]' }
	];

	const USERS = [
		'Jese Leos',
		'Robert Gough',
		'Bonnie Green',
		'Leslie Livingston',
		'Michael Gough',
		'Joseph Mcfall',
		'Roberta Casas',
		'Neil Sims'
	];

	const NOTIFICATIONS = [
		{ who: 'Jese Leos', what: 'sent you a new message', when: 'a few moments ago' },
		{ who: 'Joseph Mcfall', what: 'and 5 others started following you', when: '10 minutes ago' },
		{ who: 'Bonnie Green', what: 'and 141 others love your story', when: '44 minutes ago' },
		{ who: 'Leslie Livingston', what: 'mentioned you in a comment', when: '1 hour ago' }
	];

	const onSignOut = fn();

	const isOpen = (trigger: HTMLElement) =>
		waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
	const isClosed = (trigger: HTMLElement) =>
		waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
</script>

<script lang="ts">
	let controlledOpen = $state(false);
</script>

<Story
	name="Default"
	args={{ placement: 'bottom-start' }}
	play={async ({ canvas, userEvent, step }) => {
		onSignOut.mockClear();
		const trigger = canvas.getByRole('button', { name: 'Dropdown button' });

		await step('starts closed and wired to its content', async () => {
			await expect(trigger).toHaveAttribute('aria-expanded', 'false');
			const contentId = trigger.getAttribute('aria-controls')!;
			await expect(trigger).toHaveAttribute('popovertarget', contentId);
			await expect(document.getElementById(contentId)).toHaveAttribute('popover', 'auto');
			await expect(canvas.queryByRole('list')).toBeNull();
		});

		await step('opens on click, list named by the trigger', async () => {
			await userEvent.click(trigger);
			await isOpen(trigger);
			await expect(canvas.getByRole('list', { name: 'Dropdown button' })).toBeVisible();
			await expect(canvas.getAllByRole('link')).toHaveLength(3);
		});

		await step('closes on a second click', async () => {
			await userEvent.click(trigger);
			await isClosed(trigger);
			await expect(canvas.queryByRole('list')).toBeNull();
		});

		await step('opens by keyboard and Tab moves into the content', async () => {
			trigger.focus();
			await userEvent.keyboard('{Enter}');
			await isOpen(trigger);
			await userEvent.tab();
			await expect(canvas.getByRole('link', { name: 'Dashboard' })).toHaveFocus();
		});

		await step('picking an action runs it, closes and returns focus', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Sign out' }));
			await expect(onSignOut).toHaveBeenCalledOnce();
			await isClosed(trigger);
			await waitFor(() => expect(trigger).toHaveFocus());
		});

		// Leave it open so the a11y scan covers the content too
		await userEvent.click(trigger);
		await isOpen(trigger);
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.List>
					<Dropdown.Item href="#dashboard">Dashboard</Dropdown.Item>
					<Dropdown.Item href="#settings">Settings</Dropdown.Item>
					<Dropdown.Item href="#earnings">Earnings</Dropdown.Item>
					<Dropdown.Item onclick={onSignOut}>Sign out</Dropdown.Item>
				</Dropdown.List>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Divider"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Dropdown button' });
		await userEvent.click(trigger);
		await isOpen(trigger);

		await step('renders a semantic separator between the lists', async () => {
			await expect(canvas.getByRole('separator')).toBeVisible();
			await expect(canvas.getAllByRole('list')).toHaveLength(2);
		});
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.List>
					<Dropdown.Item href="#dashboard">Dashboard</Dropdown.Item>
					<Dropdown.Item href="#settings">Settings</Dropdown.Item>
					<Dropdown.Item href="#earnings">Earnings</Dropdown.Item>
				</Dropdown.List>
				<Dropdown.Divider />
				<Dropdown.List>
					<Dropdown.Item href="#separated">Separated link</Dropdown.Item>
				</Dropdown.List>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Header"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Dropdown button' });
		await userEvent.click(trigger);
		await isOpen(trigger);

		await step('a control row is a single, named switch', async () => {
			const dark = canvas.getByRole('switch', { name: 'Dark mode' });
			await userEvent.click(dark);
			await expect(dark).toBeChecked();
		});

		await step('toggling a control keeps the dropdown open', async () => {
			await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		});

		await step('icons are decorative', async () => {
			const account = canvas.getByRole('link', { name: 'Account' });
			await expect(account.querySelector('[data-slot="icon"]')).toHaveAttribute(
				'aria-hidden',
				'true'
			);
		});
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
			<Dropdown.Content class="w-72">
				<Dropdown.Header>
					<div class="flex items-center gap-x-2 rounded bg-neutral-secondary-strong p-2">
						<Avatar alt="" size="sm"><Avatar.Image src={PHOTO} /></Avatar>
						<div class="min-w-0 text-sm">
							<Strong class="block">Bonnie Green</Strong>
							<Text class="truncate text-sm">name@flowbite.com</Text>
						</div>
						<Chip color="accent" size="sm" class="ms-auto">PRO</Chip>
					</div>
				</Dropdown.Header>
				<Dropdown.List>
					{#each ACCOUNT as item (item.label)}
						<Dropdown.Item href="#{item.label}">
							<Icon icon={item.icon} />
							{item.label}
						</Dropdown.Item>
					{/each}
					<Dropdown.Item>
						<Switch>
							<Switch.Content>
								<Label class="flex items-center gap-x-1.5">
									<Icon icon="icon-[flowbite--moon-outline]" />
									Dark mode
								</Label>
							</Switch.Content>
							<Switch.Control class="ms-auto" />
						</Switch>
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item href="#upgrade">
						<Icon icon="icon-[flowbite--rocket-outline]" />
						Upgrade to PRO
					</Dropdown.Item>
					<Dropdown.Item href="#sign-out" danger>
						<Icon icon="icon-[flowbite--arrow-right-to-bracket-outline]" />
						Sign out
					</Dropdown.Item>
				</Dropdown.List>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Checkboxes"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Dropdown button' });
		await userEvent.click(trigger);
		await isOpen(trigger);

		await step('reuses Checkbox and stays open while toggling', async () => {
			const box = canvas.getByRole('checkbox', { name: 'Default checkbox' });
			await userEvent.click(box);
			await expect(box).toBeChecked();
			await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		});

		await step('clicking the label toggles exactly once', async () => {
			const box = canvas.getByRole('checkbox', { name: 'Checked state' });
			await userEvent.click(canvas.getByText('Checked state'));
			await expect(box).not.toBeChecked();
		});

		await step('clicking anywhere on the row toggles it', async () => {
			const box = canvas.getByRole('checkbox', { name: 'Another checkbox' });
			box.closest<HTMLElement>('[data-slot="dropdown-item"]')!.click();
			await expect(box).toBeChecked();
		});
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
			<Dropdown.Content class="w-52">
				<Dropdown.List>
					{#each ['Default checkbox', 'Checked state', 'Another checkbox'] as label, i (label)}
						<Dropdown.Item plain>
							<Checkbox checked={i === 1}>
								<Checkbox.Control />
								<Checkbox.Content><Label>{label}</Label></Checkbox.Content>
							</Checkbox>
						</Dropdown.Item>
					{/each}
				</Dropdown.List>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story name="Checkboxes With Hover">
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
			<Dropdown.Content class="w-52">
				<Dropdown.List>
					{#each ['Default checkbox', 'Checked state', 'Another checkbox'] as label, i (label)}
						<Dropdown.Item>
							<Checkbox checked={i === 1}>
								<Checkbox.Control />
								<Checkbox.Content><Label>{label}</Label></Checkbox.Content>
							</Checkbox>
						</Dropdown.Item>
					{/each}
				</Dropdown.List>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Checkboxes With Helper"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Dropdown button' });
		await userEvent.click(trigger);
		await isOpen(trigger);

		await step('helper text describes its checkbox', async () => {
			const box = canvas.getByRole('checkbox', { name: 'Enable 2FA auth' });
			await expect(box).toHaveAccessibleDescription('Require a code from your phone to sign in.');
		});
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
			<Dropdown.Content class="w-64">
				<Dropdown.List>
					{#each [['Enable notifications', 'Get notified when someone mentions you.'], ['Enable 2FA auth', 'Require a code from your phone to sign in.'], ['Subscribe newsletter', 'One email a month, unsubscribe anytime.']] as [label, help] (label)}
						<Dropdown.Item>
							<Checkbox>
								<Checkbox.Control />
								<Checkbox.Content>
									<Label>{label}</Label>
									<Text>{help}</Text>
								</Checkbox.Content>
							</Checkbox>
						</Dropdown.Item>
					{/each}
				</Dropdown.List>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Toggles"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Dropdown button' });
		await userEvent.click(trigger);
		await isOpen(trigger);

		await step('reuses Switch', async () => {
			await expect(canvas.getAllByRole('switch')).toHaveLength(4);
		});

		await step('clicking anywhere on the row toggles it', async () => {
			const toggle = canvas.getByRole('switch', { name: 'Enable notifications' });
			toggle.closest<HTMLElement>('[data-slot="dropdown-item"]')!.click();
			await expect(toggle).toBeChecked();
		});

		await step('bare text forwarded by Switch.Content toggles exactly once', async () => {
			const toggle = canvas.getByRole('switch', { name: 'Show online status' });
			await userEvent.click(canvas.getByText('Show online status'));
			await expect(toggle).toBeChecked();
		});
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
			<Dropdown.Content class="w-72">
				<Dropdown.List>
					{#each ['Enable notifications', 'Enable 2FA authentication', 'Subscribe to newsletter'] as label (label)}
						<Dropdown.Item>
							<Switch>
								<Switch.Control />
								<Switch.Content><Label>{label}</Label></Switch.Content>
							</Switch>
						</Dropdown.Item>
					{/each}
					<Dropdown.Item>
						<Switch>
							<Switch.Content>
								<Switch.Control />
								Show online status
							</Switch.Content>
						</Switch>
					</Dropdown.Item>
				</Dropdown.List>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Avatar Trigger"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Open user menu' });

		await step('an icon-only trigger is named by aria-label', async () => {
			await userEvent.click(trigger);
			await isOpen(trigger);
			await expect(canvas.getByRole('list', { name: 'Open user menu' })).toBeVisible();
		});
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger
				variant="ghost"
				chevron={false}
				aria-label="Open user menu"
				class="rounded-full border-0 p-0"
			>
				<Avatar alt="" size="sm" class="rounded-full"><Avatar.Image src={PHOTO} /></Avatar>
			</Dropdown.Trigger>
			<Dropdown.Content class="w-72">
				<Dropdown.Header>
					<div class="flex items-center gap-x-2 rounded bg-neutral-secondary-strong p-2">
						<Avatar alt="" size="sm"><Avatar.Image src={PHOTO} /></Avatar>
						<div class="min-w-0 text-sm">
							<Strong class="block">Joseph McFall</Strong>
							<Text class="truncate text-sm">name@flowbite.com</Text>
						</div>
					</div>
				</Dropdown.Header>
				<Dropdown.List>
					{#each ACCOUNT as item (item.label)}
						<Dropdown.Item href="#{item.label}">
							<Icon icon={item.icon} />
							{item.label}
						</Dropdown.Item>
					{/each}
					<Dropdown.Divider />
					<Dropdown.Item href="#sign-out" danger>
						<Icon icon="icon-[flowbite--arrow-right-to-bracket-outline]" />
						Sign out
					</Dropdown.Item>
				</Dropdown.List>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Scrollable With Footer"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Assign users' });
		await userEvent.click(trigger);
		await isOpen(trigger);

		await step('the scroll region is keyboard reachable and named', async () => {
			const list = canvas.getByRole('list', { name: 'Users' });
			await expect(list).toHaveAttribute('tabindex', '0');
			await expect(canvas.getAllByRole('checkbox')).toHaveLength(USERS.length);
		});

		await step('footer holds a regular Button', async () => {
			await expect(canvas.getByRole('button', { name: 'Delete user' })).toBeVisible();
		});
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="primary">Assign users</Dropdown.Trigger>
			<Dropdown.Content class="w-56">
				<Dropdown.List class="h-48 overflow-y-auto" tabindex={0} aria-label="Users">
					{#each USERS as name (name)}
						<Dropdown.Item>
							<Checkbox class="flex-row-reverse justify-between">
								<Checkbox.Control />
								<Checkbox.Content class="flex-row items-center gap-x-2">
									<Avatar alt="" size="sm" class="size-5"><Avatar.Image src={PHOTO} /></Avatar>
									<Label>{name}</Label>
								</Checkbox.Content>
							</Checkbox>
						</Dropdown.Item>
					{/each}
				</Dropdown.List>
				<Dropdown.Footer>
					<Button variant="danger" size="xs" class="w-full">
						<Icon icon="icon-[flowbite--trash-bin-outline]" />
						Delete user
					</Button>
				</Dropdown.Footer>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Notifications"
	args={{ placement: 'bottom-end' }}
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: /Notifications/ });
		await userEvent.click(trigger);
		await isOpen(trigger);

		await step('the list is named by the visible header', async () => {
			await expect(canvas.getByRole('list', { name: 'Notifications' })).toBeVisible();
		});

		await step('each notification is one link', async () => {
			await expect(canvas.getAllByRole('link')).toHaveLength(NOTIFICATIONS.length + 1);
		});
	}}
>
	{#snippet template(args)}
		<Dropdown {...args}>
			<Dropdown.Trigger variant="ghost" chevron={false} class="relative">
				<Icon icon="icon-[flowbite--bell-outline]" class="size-6" />
				<span class="sr-only">Notifications, {NOTIFICATIONS.length} unread</span>
				<span
					aria-hidden="true"
					class="absolute start-6 top-2 size-3 rounded-full border-2 border-buffer bg-danger"
				></span>
			</Dropdown.Trigger>
			<Dropdown.Content class="w-sm divide-y divide-default-medium p-0">
				<Dropdown.Header
					id="notifications-title"
					class="bg-neutral-secondary-medium px-4 py-2 text-center"
				>
					Notifications
				</Dropdown.Header>
				<Dropdown.List aria-labelledby="notifications-title" class="divide-y divide-default p-0">
					{#each NOTIFICATIONS as n (n.who)}
						<Dropdown.Item href="#notification" class="items-start gap-x-3 rounded-none px-4 py-3">
							<Avatar alt="" class="size-11 shrink-0 rounded-full"
								><Avatar.Image src={PHOTO} /></Avatar
							>
							<span class="flex flex-col gap-y-1.5 font-normal">
								<span><Strong>{n.who}</Strong> {n.what}</span>
								<span class="text-xs text-fg-brand">{n.when}</span>
							</span>
						</Dropdown.Item>
					{/each}
				</Dropdown.List>
				<Dropdown.Footer class="border-0 bg-neutral-secondary-medium p-0 text-center">
					<Link href="#all" class="flex items-center justify-center gap-x-1.5 py-2">
						<Icon icon="icon-[flowbite--eye-outline]" class="size-5" />
						View all
					</Link>
				</Dropdown.Footer>
			</Dropdown.Content>
		</Dropdown>
	{/snippet}
</Story>

<Story
	name="Split Button"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'More save options' });

		await step('a Dropdown trigger joins a ButtonGroup', async () => {
			await expect(canvas.getByRole('group', { name: 'Save' })).toContainElement(trigger);
			await userEvent.click(trigger);
			await isOpen(trigger);
		});
	}}
>
	{#snippet template(args)}
		<ButtonGroup aria-label="Save">
			<Button variant="primary">Save</Button>
			<Dropdown placement="bottom-end" {...args}>
				<Dropdown.Trigger variant="primary" aria-label="More save options" class="px-2.5" />
				<Dropdown.Content>
					<Dropdown.List>
						<Dropdown.Item onclick={() => {}}>Save as draft</Dropdown.Item>
						<Dropdown.Item onclick={() => {}}>Save and publish</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>
		</ButtonGroup>
	{/snippet}
</Story>

<Story
	name="Placements"
	parameters={{ layout: 'padded' }}
	play={async ({ canvas, userEvent, step }) => {
		await step('every placement opens next to its trigger', async () => {
			for (const trigger of canvas.getAllByRole('button')) {
				await userEvent.click(trigger);
				await isOpen(trigger);
				await userEvent.click(trigger);
				await isClosed(trigger);
			}
		});
	}}
>
	{#snippet template()}
		<div class="grid grid-cols-3 gap-4 p-48">
			{#each Object.keys(Dropdown.theme.variants.placement) as placement (placement)}
				<Dropdown placement={placement as Placement}>
					<Dropdown.Trigger variant="secondary" size="sm">{placement}</Dropdown.Trigger>
					<Dropdown.Content class="w-36">
						<Dropdown.List>
							<Dropdown.Item href="#one">One</Dropdown.Item>
							<Dropdown.Item href="#two">Two</Dropdown.Item>
						</Dropdown.List>
					</Dropdown.Content>
				</Dropdown>
			{/each}
		</div>
	{/snippet}
</Story>

<Story
	name="Focus Leaves"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Dropdown button' });
		const after = canvas.getByRole('button', { name: 'Next control' });

		await step('Shift+Tab back to the trigger keeps it open', async () => {
			await userEvent.click(trigger);
			await isOpen(trigger);
			await userEvent.tab();
			await userEvent.tab({ shift: true });
			await expect(trigger).toHaveFocus();
			await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		});

		await step('tabbing past the last item closes it', async () => {
			await userEvent.tab();
			await userEvent.tab();
			await userEvent.tab();
			await expect(after).toHaveFocus();
			await isClosed(trigger);
		});
	}}
>
	{#snippet template(args)}
		<div class="flex items-center gap-4">
			<Dropdown {...args}>
				<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.List>
						<Dropdown.Item href="#one">One</Dropdown.Item>
						<Dropdown.Item href="#two">Two</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>
			<Button variant="secondary">Next control</Button>
		</div>
	{/snippet}
</Story>

<Story
	name="Controlled"
	play={async ({ canvas, userEvent, step }) => {
		const trigger = canvas.getByRole('button', { name: 'Dropdown button' });

		await step('bind:open drives the popover', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Open from outside' }));
			await isOpen(trigger);
			await expect(canvas.getByRole('list')).toBeVisible();
		});

		await step('a native toggle writes back to bind:open', async () => {
			await userEvent.click(trigger);
			await isClosed(trigger);
			await expect(canvas.getByTestId('state')).toHaveTextContent('closed');
		});
	}}
>
	{#snippet template(args)}
		<div class="flex flex-col items-start gap-4">
			<Button variant="secondary" onclick={() => (controlledOpen = true)}>Open from outside</Button>
			<Text data-testid="state">{controlledOpen ? 'open' : 'closed'}</Text>
			<Dropdown bind:open={controlledOpen} {...args}>
				<Dropdown.Trigger variant="primary">Dropdown button</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.List>
						<Dropdown.Item href="#one">One</Dropdown.Item>
						<Dropdown.Item href="#two">Two</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>
		</div>
	{/snippet}
</Story>
