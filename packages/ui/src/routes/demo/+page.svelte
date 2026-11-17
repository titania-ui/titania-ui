<script lang="ts">
	import PHOTO from '../../lib/assets/placeholder_avatar.png';
	import {
		Alert,
		Avatar,
		AvatarGroup,
		Button,
		ButtonGroup,
		Checkbox,
		CheckboxField,
		Chip,
		Code,
		DescriptionList,
		Dropdown,
		Field,
		Form,
		Heading,
		Icon,
		Input,
		InputGroup,
		Label,
		Link,
		Select,
		Sidebar,
		Spinner,
		Strong,
		Switch,
		Text,
		Textarea
	} from '../../lib/index.js';
	import { reservationSchema } from './utils.js';
	import { untrack } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const reservationForm = superForm(
		untrack(() => data.form),
		{
			validators: zod4(reservationSchema)
		}
	);

	const lorem10 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sit.';

	const STACK = { class: '*:m-0 space-y-4!' };

	const LIST = { class: 'flex flex-row gap-4 flex-wrap basis items-center' };

	let dropdownOpen = $state(false);
	let lastAction = $state('none');

	const DROPDOWN_ACCOUNT = [
		{ label: 'Account', icon: 'icon-[flowbite--user-outline]' },
		{ label: 'Settings', icon: 'icon-[flowbite--cog-outline]' },
		{ label: 'Privacy', icon: 'icon-[flowbite--lock-outline]' },
		{ label: 'Notifications', icon: 'icon-[flowbite--bell-outline]' },
		{ label: 'Help center', icon: 'icon-[flowbite--question-circle-outline]' }
	];

	const DROPDOWN_OPTIONS = [
		['Enable notifications', 'Get notified when someone mentions you.'],
		['Enable 2FA auth', 'Require a code from your phone to sign in.'],
		['Subscribe newsletter', 'One email a month, unsubscribe anytime.']
	];

	const DROPDOWN_USERS = [
		'Jese Leos',
		'Robert Gough',
		'Bonnie Green',
		'Leslie Livingston',
		'Michael Gough',
		'Joseph Mcfall',
		'Roberta Casas',
		'Neil Sims'
	];

	const DROPDOWN_NOTIFICATIONS = [
		{ who: 'Jese Leos', what: 'sent you a new message', when: 'a few moments ago' },
		{ who: 'Joseph Mcfall', what: 'and 5 others started following you', when: '10 minutes ago' },
		{ who: 'Bonnie Green', what: 'and 141 others love your story', when: '44 minutes ago' },
		{ who: 'Leslie Livingston', what: 'mentioned you in a comment', when: '1 hour ago' }
	];
</script>

<div class="space-y-12! p-6 *:m-0">
	<div {...STACK}>
		<Heading level={1}>Heading 1</Heading>
		<Text>{lorem10}</Text>
		<Heading level={2}>Heading 2</Heading>
		<Text>{lorem10}</Text>
		<Heading level={3}>Heading 3</Heading>
		<Text>{lorem10}</Text>
		<Heading level={4}>Heading 4</Heading>
		<Text>{lorem10}</Text>
		<Heading level={5}>Heading 5</Heading>
		<Text>{lorem10}</Text>
		<Heading level={6}>Heading 6</Heading>
		<Text
			>Lorem ipsum <Strong>dolor sit amet</Strong>, consectetur adipisicing elit. Veniam magnam ad
			libero obcaecati dolores <Icon icon="icon-[noto--bullet-train]" /> cumque deserunt, <Code
				>Lorem ipsum dolor sit amet.</Code
			> iusto, nostrum, ea corporis <Strong>sequi maiores exercitationem</Strong> nobis nihil vel pariatur
			maxime repellendus dicta doloremque. <Link href="#">Eligendi sed laborum</Link> dolorum vero unde
			cumque sunt nihil? <Code>Lorem ipsum dolor sit amet.</Code>
		</Text>
	</div>

	{#each Object.keys(Button.theme.variants.size) as size (size)}
		<div {...LIST}>
			{#each Object.keys(Button.theme.variants.variant) as variant (variant)}
				<Button
					variant={variant as keyof typeof Button.theme.variants.variant}
					size={size as keyof typeof Button.theme.variants.size}
				>
					<Icon icon="icon-[heroicons--inbox-solid]" />
					{variant}
				</Button>
			{/each}
			{#each Object.keys(Button.theme.variants.color) as color, index (color)}
				<Button
					color={color as keyof typeof Button.theme.variants.color}
					size={size as keyof typeof Button.theme.variants.size}
				>
					{#if index % 3 === 0}
						<Icon icon="icon-[heroicons--inbox-solid]" />
					{:else if index % 3 === 1}
						<Spinner />
					{/if}
					{color}
				</Button>
			{/each}
		</div>
	{/each}

	<div {...LIST}>
		{#each Object.keys(Button.theme.variants.variant) as variant (variant)}
			<Button variant={variant as keyof typeof Button.theme.variants.variant} disabled>
				<Icon icon="icon-[heroicons--inbox-solid]" />
				{variant} disabled
			</Button>
		{/each}
		{#each Object.keys(Button.theme.variants.color) as color, index (color)}
			<Button color={color as keyof typeof Button.theme.variants.color} disabled>
				{#if index % 3 === 0}
					<Icon icon="icon-[heroicons--inbox-solid]" />
				{:else if index % 3 === 1}
					<Spinner />
				{/if}
				{color} disabled
			</Button>
		{/each}
	</div>

	<div {...LIST}>
		<ButtonGroup aria-label="Account sections">
			<Button variant="secondary">Profile</Button>
			<Button variant="secondary">Settings</Button>
			<Button variant="secondary">Messages</Button>
		</ButtonGroup>

		<ButtonGroup aria-label="Text alignment">
			<Button variant="secondary" size="sm">
				<Icon icon="icon-[heroicons--bars-3-bottom-left-solid]" />
				Left
			</Button>
			<Button variant="secondary" size="sm">
				<Icon icon="icon-[heroicons--bars-3-solid]" />
				Center
			</Button>
			<Button variant="secondary" size="sm" disabled>Right</Button>
		</ButtonGroup>

		<ButtonGroup orientation="vertical" aria-label="Actions">
			<Button variant="secondary">Edit</Button>
			<Button variant="secondary">Duplicate</Button>
			<Button variant="secondary">Archive</Button>
		</ButtonGroup>
	</div>

	<div {...STACK}>
		<Heading level={2}>Dropdown</Heading>

		<Heading level={4}>Triggers</Heading>
		<div {...LIST}>
			<Dropdown>
				<Dropdown.Trigger variant="primary">Primary</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.List>
						<Dropdown.Item href="#dashboard">Dashboard</Dropdown.Item>
						<Dropdown.Item href="#settings">Settings</Dropdown.Item>
						<Dropdown.Item href="#earnings">Earnings</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>

			<Dropdown>
				<Dropdown.Trigger variant="outline" size="sm">Outline small</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.List>
						<Dropdown.Item href="#dashboard">Dashboard</Dropdown.Item>
						<Dropdown.Item href="#settings">Settings</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>

			<Dropdown>
				<Dropdown.Trigger variant="secondary" chevron={false}>
					<Icon icon="icon-[flowbite--cog-outline]" />
					No chevron
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.List>
						<Dropdown.Item href="#dashboard">Dashboard</Dropdown.Item>
						<Dropdown.Item href="#settings">Settings</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>

			<Dropdown>
				<Dropdown.Trigger variant="primary" disabled>Disabled</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.List>
						<Dropdown.Item href="#dashboard">Dashboard</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>

			<ButtonGroup aria-label="Save">
				<Button variant="primary">Save</Button>
				<Dropdown placement="bottom-end">
					<Dropdown.Trigger variant="primary" aria-label="More save options" class="px-2.5" />
					<Dropdown.Content>
						<Dropdown.List>
							<Dropdown.Item onclick={() => (lastAction = 'Save as draft')}>
								Save as draft
							</Dropdown.Item>
							<Dropdown.Item onclick={() => (lastAction = 'Save and publish')}>
								Save and publish
							</Dropdown.Item>
						</Dropdown.List>
					</Dropdown.Content>
				</Dropdown>
			</ButtonGroup>

			<Dropdown>
				<Dropdown.Trigger
					variant="ghost"
					chevron={false}
					aria-label="Open user menu"
					class="rounded-full border-0 p-0"
				>
					<Avatar alt="" size="sm"><Avatar.Image src={PHOTO} /></Avatar>
				</Dropdown.Trigger>
				<Dropdown.Content class="w-56">
					<Dropdown.List>
						{#each DROPDOWN_ACCOUNT.slice(0, 2) as item (item.label)}
							<Dropdown.Item href="#{item.label}">
								<Icon icon={item.icon} />
								{item.label}
							</Dropdown.Item>
						{/each}
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>

			<Dropdown placement="bottom-end">
				<Dropdown.Trigger variant="ghost" chevron={false} class="relative">
					<Icon icon="icon-[flowbite--bell-outline]" class="size-6" />
					<span class="sr-only">Notifications, {DROPDOWN_NOTIFICATIONS.length} unread</span>
					<span
						aria-hidden="true"
						class="absolute start-6 top-2 size-3 rounded-full border-2 border-buffer bg-danger"
					></span>
				</Dropdown.Trigger>
				<Dropdown.Content class="w-sm divide-y divide-default-medium">
					<Dropdown.Header
						id="demo-notifications-title"
						class="bg-neutral-secondary-medium px-4 py-2 text-center"
					>
						Notifications
					</Dropdown.Header>
					<Dropdown.List
						aria-labelledby="demo-notifications-title"
						class="divide-y divide-default p-0"
					>
						{#each DROPDOWN_NOTIFICATIONS as n (n.who)}
							<Dropdown.Item
								href="#notification"
								class="items-start gap-x-3 rounded-none px-4 py-3"
							>
								<Avatar alt="" class="size-11 shrink-0 rounded-full">
									<Avatar.Image src={PHOTO} />
								</Avatar>
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
		</div>

		<Heading level={4}>Header, footer, dividers</Heading>
		<div {...LIST}>
			<Dropdown>
				<Dropdown.Trigger variant="secondary">Divider</Dropdown.Trigger>
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

			<Dropdown>
				<Dropdown.Trigger variant="secondary">Header</Dropdown.Trigger>
				<Dropdown.Content class="w-72">
					<Dropdown.Header>
						<div class="flex items-center gap-x-2 rounded bg-black/5 p-2">
							<Avatar alt="" size="sm"><Avatar.Image src={PHOTO} /></Avatar>
							<div class="min-w-0 text-sm">
								<Strong class="block">Tom Example</Strong>
								<Text class="truncate text-sm">tom@example.com</Text>
							</div>
							<Chip color="accent" size="sm" class="ms-auto">PRO</Chip>
						</div>
					</Dropdown.Header>
					<Dropdown.List>
						{#each DROPDOWN_ACCOUNT as item (item.label)}
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

			<Dropdown>
				<Dropdown.Trigger variant="secondary">Footer</Dropdown.Trigger>
				<Dropdown.Content class="w-56">
					<Dropdown.List>
						{#each DROPDOWN_ACCOUNT.slice(0, 3) as item (item.label)}
							<Dropdown.Item href="#{item.label}">
								<Icon icon={item.icon} />
								{item.label}
							</Dropdown.Item>
						{/each}
					</Dropdown.List>
					<Dropdown.Footer>
						<Button variant="danger" size="xs" class="w-full">
							<Icon icon="icon-[flowbite--arrow-right-to-bracket-outline]" />
							Sign out
						</Button>
					</Dropdown.Footer>
				</Dropdown.Content>
			</Dropdown>

			<Dropdown>
				<Dropdown.Trigger variant="secondary">Header and footer</Dropdown.Trigger>
				<Dropdown.Content class="w-64">
					<Dropdown.Header class="border-b border-default-medium">
						<Strong id="demo-workspace-title" class="block px-2">Switch workspace</Strong>
						<Text class="px-2 text-xs">You are a member of 3 workspaces.</Text>
					</Dropdown.Header>
					<Dropdown.List aria-labelledby="demo-workspace-title" class="pt-2!">
						<Dropdown.Item onclick={() => (lastAction = 'Acme Inc.')}>Acme Inc.</Dropdown.Item>
						<Dropdown.Item onclick={() => (lastAction = 'Globex')}>Globex</Dropdown.Item>
						<Dropdown.Item disabled onclick={() => (lastAction = 'Initech')}>
							Initech (suspended)
						</Dropdown.Item>
					</Dropdown.List>
					<Dropdown.Footer>
						<Link href="#new-workspace" class="flex items-center gap-x-1.5 px-2 py-1 text-sm">
							<Icon icon="icon-[flowbite--grid-plus-outline]" />
							Create workspace
						</Link>
					</Dropdown.Footer>
				</Dropdown.Content>
			</Dropdown>

			<Dropdown>
				<Dropdown.Trigger variant="secondary">Scrollable with footer</Dropdown.Trigger>
				<Dropdown.Content class="w-56">
					<Dropdown.List class="h-48 overflow-y-auto" tabindex={0} aria-label="Users">
						{#each DROPDOWN_USERS as name (name)}
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
		</div>

		<Heading level={4}>Checkboxes and toggles</Heading>
		<div {...LIST}>
			<Dropdown>
				<Dropdown.Trigger variant="secondary">Checkboxes</Dropdown.Trigger>
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

			<Dropdown>
				<Dropdown.Trigger variant="secondary">Checkboxes with hover</Dropdown.Trigger>
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

			<Dropdown>
				<Dropdown.Trigger variant="secondary">Checkboxes with helper</Dropdown.Trigger>
				<Dropdown.Content class="w-64">
					<Dropdown.List>
						{#each DROPDOWN_OPTIONS as [label, help] (label)}
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

			<Dropdown>
				<Dropdown.Trigger variant="secondary">Toggles</Dropdown.Trigger>
				<Dropdown.Content class="w-72">
					<Dropdown.List>
						{#each DROPDOWN_OPTIONS as [label] (label)}
							<Dropdown.Item>
								<Switch>
									<Switch.Control />
									<Switch.Content><Label>{label}</Label></Switch.Content>
								</Switch>
							</Dropdown.Item>
						{/each}
						<Dropdown.Item disabled>
							<Switch disabled>
								<Switch.Control />
								<Switch.Content><Label>Beta features (unavailable)</Label></Switch.Content>
							</Switch>
						</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>
		</div>

		<Heading level={4}>Behaviour</Heading>
		<div {...LIST}>
			<Dropdown bind:open={dropdownOpen}>
				<Dropdown.Trigger variant="secondary">Controlled</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.List>
						<Dropdown.Item onclick={() => (lastAction = 'Rename')}>Rename</Dropdown.Item>
						<Dropdown.Item onclick={() => (lastAction = 'Duplicate')}>Duplicate</Dropdown.Item>
						<Dropdown.Item
							onclick={(e: MouseEvent) => {
								e.preventDefault();
								lastAction = 'Refreshed (stayed open)';
							}}
						>
							Refresh (keeps open)
						</Dropdown.Item>
						<Dropdown.Item disabled onclick={() => (lastAction = 'never')}>Archive</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item danger onclick={() => (lastAction = 'Delete')}>Delete</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Content>
			</Dropdown>
			<Button variant="ghost" onclick={() => (dropdownOpen = !dropdownOpen)}>
				Toggle from outside
			</Button>
			<Text>Open: <Code>{dropdownOpen}</Code> · Last action: <Code>{lastAction}</Code></Text>
		</div>

		<Heading level={4}>Placements</Heading>
		<div class="grid grid-cols-3 gap-4 py-24 sm:px-24">
			{#each Object.keys(Dropdown.theme.variants.placement) as placement (placement)}
				<Dropdown placement={placement as keyof typeof Dropdown.theme.variants.placement}>
					<Dropdown.Trigger variant="secondary" size="sm" class="justify-self-center">
						{placement}
					</Dropdown.Trigger>
					<Dropdown.Content class="w-36">
						<Dropdown.List>
							<Dropdown.Item href="#one">One</Dropdown.Item>
							<Dropdown.Item href="#two">Two</Dropdown.Item>
						</Dropdown.List>
					</Dropdown.Content>
				</Dropdown>
			{/each}
		</div>
	</div>

	<Form form={reservationForm}>
		<Form.ErrorSummary />
		<Form.Fieldset>
			<Form.Legend>Reservation details</Form.Legend>
			<Text>Without this your odds of getting a table are low.</Text>
			<Form.FieldGroup>
				<Field auto name="party_size">
					<Label>Party size</Label>
					<InputGroup>
						<InputGroup.Prefix>
							<Icon icon="icon-[fluent-emoji-flat--party-popper]" />
						</InputGroup.Prefix>
						<Input type="number" />
						<InputGroup.Suffix>Guests</InputGroup.Suffix>
					</InputGroup>
					<Field.Error />
				</Field>
				<Field auto name="seating">
					<Label>Seating preference</Label>
					<Select>
						<option value="indoor">Indoor</option>
						<option value="patio">Patio</option>
						<option value="bar">Bar</option>
					</Select>
					<Field.Description>
						We currently only offer indoor, patio, or bar seating.
					</Field.Description>
					<Field.Error />
				</Field>
				<Field auto name="notes">
					<Label>Special requests</Label>
					<Textarea />
					<Field.Description>
						If you're celebrating something, we'd like to know about it.
					</Field.Description>
					<Field.Error />
				</Field>
				<Field auto name="date">
					<Label>Date</Label>
					<Input type="date" />
					<Field.Error />
				</Field>
				<CheckboxField auto name="terms">
					<Checkbox>
						<Checkbox.Control />
						<Checkbox.Content>
							<Label>Accept terms and conditions</Label>
						</Checkbox.Content>
					</Checkbox>
					<Field.Error />
				</CheckboxField>
				<CheckboxField auto name="notifications">
					<Switch>
						<Switch.Control />
						<Switch.Content>
							<Label>Email notifications</Label>
							<Text>We'll send a reminder the day before your reservation.</Text>
						</Switch.Content>
					</Switch>
					<Field.Error />
				</CheckboxField>
			</Form.FieldGroup>
		</Form.Fieldset>
		<Button type="submit" variant="primary" class="w-full">Reserve table</Button>
	</Form>

	<div {...STACK}>
		{#each Object.keys(Alert.theme.variants.status) as status (status)}
			<Alert status={status as keyof typeof Alert.theme.variants.status}>
				<Alert.Indicator />
				<Alert.Title>{status}</Alert.Title>
				<Alert.Description>{lorem10}</Alert.Description>
				<Alert.Dismiss />
			</Alert>
		{/each}
		<Alert status="accent">
			<Alert.Indicator as={Spinner} />
			<Alert.Title>loading</Alert.Title>
			<Alert.Description>{lorem10}</Alert.Description>
			<Alert.Dismiss />
		</Alert>
	</div>

	{#each Object.keys(Chip.theme.variants.size) as size (size)}
		<div {...LIST}>
			{#each Object.keys(Chip.theme.variants.color) as color, index (color)}
				<Chip
					color={color as keyof typeof Chip.theme.variants.color}
					size={size as keyof typeof Chip.theme.variants.size}
				>
					{#if index % 3 === 0}
						<Icon icon="icon-[heroicons--inbox-solid]" />
					{:else if index % 3 === 1}
						<Spinner />
					{/if}
					<Chip.Label>{color}</Chip.Label>
					{#if index % 2 === 0}
						<Chip.Dismiss />
					{/if}
				</Chip>
			{/each}
		</div>
	{/each}

	<div class="h-256 w-64">
		<Sidebar aria-label="Main">
			<Sidebar.Header>
				<Sidebar.Section>
					<Sidebar.Item href="#">
						<Icon icon="icon-[flowbite--home-solid]" />
						<Sidebar.Label>Cucumber</Sidebar.Label>
					</Sidebar.Item>
					<Sidebar.Item href="#">
						<Icon icon="icon-[flowbite--briefcase-solid]" />
						<Sidebar.Label>Orange Juice</Sidebar.Label>
					</Sidebar.Item>
				</Sidebar.Section>
			</Sidebar.Header>
			<Sidebar.Body>
				<Sidebar.Section>
					<Sidebar.Item href="#" current>
						<Sidebar.Label>Apple Pie</Sidebar.Label>
					</Sidebar.Item>
					<Sidebar.Item href="#">
						<Sidebar.Label>Strawberry Cake</Sidebar.Label>
					</Sidebar.Item>
					<Sidebar.Item href="#">
						<Sidebar.Label>Blueberry Muffin</Sidebar.Label>
					</Sidebar.Item>
					<Sidebar.Item href="#">
						<Sidebar.Label>Banana Bread</Sidebar.Label>
					</Sidebar.Item>
				</Sidebar.Section>
				<Sidebar.Spacer />
				<Sidebar.Section>
					<Sidebar.Item href="#">
						<Sidebar.Label>Chocolate Chip Cookies</Sidebar.Label>
					</Sidebar.Item>
					<Sidebar.Item href="#">
						<Sidebar.Label>Oatmeal Raisin Cookies</Sidebar.Label>
					</Sidebar.Item>
				</Sidebar.Section>
			</Sidebar.Body>
			<Sidebar.Footer>
				<Sidebar.Section>
					<Sidebar.Item href="#">
						<Sidebar.Label>Cereal</Sidebar.Label>
					</Sidebar.Item>
					<Sidebar.Item href="#">
						<Sidebar.Label>Milk</Sidebar.Label>
					</Sidebar.Item>
				</Sidebar.Section>
			</Sidebar.Footer>
		</Sidebar>
	</div>

	<DescriptionList>
		{#each [{ term: 'Wood', description: 'Made from trees' }, { term: 'Metal', description: 'Made from minerals' }, { term: 'Plastic', description: 'Made from oil' }] as item (item.term)}
			<DescriptionList.Item>
				<DescriptionList.Term>{item.term}</DescriptionList.Term>
				<DescriptionList.Description>{item.description}</DescriptionList.Description>
			</DescriptionList.Item>
		{/each}
	</DescriptionList>

	<div {...LIST}>
		<AvatarGroup max={3}>
			<Avatar alt="John Doe">
				<Avatar.Image src={PHOTO} />
			</Avatar>
			<Avatar alt="John Doe">
				<Avatar.Image src={PHOTO} />
			</Avatar>
			<Avatar alt="John Doe">
				<Avatar.Image src={PHOTO} />
			</Avatar>
			<Avatar alt="John Doe">
				<Avatar.Image src={PHOTO} />
			</Avatar>
			<Avatar alt="John Doe">
				<Avatar.Image src={PHOTO} />
			</Avatar>
			<Avatar alt="John Doe">
				<Avatar.Image src={PHOTO} />
			</Avatar>
		</AvatarGroup>

		<AvatarGroup max={3}>
			<Avatar alt="John Doe">
				<Avatar.Image src={PHOTO} />
			</Avatar>
			<Avatar alt="John Doe">
				<Avatar.Image src={PHOTO} />
			</Avatar>
		</AvatarGroup>

		<Avatar alt="John Doe">
			<Avatar.Image src={PHOTO} />
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar>

		<Avatar alt="John Doe">
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar>

		<Avatar alt="John Doe">
			<Avatar.Image src="ERROR" />
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar>
	</div>

	<div {...LIST}>
		<Checkbox>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Default</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Checked</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox indeterminate>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Indeterminate</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox invalid>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Invalid</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox disabled>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Disabled</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox disabled checked>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Disabled checked</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox disabled indeterminate>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Disabled indeterminate</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked>
			<Checkbox.Control>
				<Icon icon="icon-[heroicons--heart-solid]" />
			</Checkbox.Control>
			<Checkbox.Content>
				<Label>Custom control content</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox>
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>Lorem ipsum dolor sit</Label>
				<Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, illum?</Text>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox>
			<Checkbox.Content>
				<Checkbox.Control />
				Bare text
			</Checkbox.Content>
		</Checkbox>
	</div>

	<div {...LIST}>
		<Checkbox checked color="dark">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>dark</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="zinc">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>zinc</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="white">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>white</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="red">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>red</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="orange">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>orange</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="amber">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>amber</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="yellow">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>yellow</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="lime">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>lime</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="green">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>green</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="emerald">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>emerald</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="teal">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>teal</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="cyan">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>cyan</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="sky">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>sky</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="blue">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>blue</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="indigo">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>indigo</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="violet">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>violet</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="purple">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>purple</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="fuchsia">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>fuchsia</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="pink">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>pink</Label>
			</Checkbox.Content>
		</Checkbox>
		<Checkbox checked color="rose">
			<Checkbox.Control />
			<Checkbox.Content>
				<Label>rose</Label>
			</Checkbox.Content>
		</Checkbox>
	</div>

	<div {...LIST}>
		<Switch>
			<Switch.Control />
			<Switch.Content>
				<Label>Default</Label>
			</Switch.Content>
		</Switch>
		<Switch checked>
			<Switch.Control />
			<Switch.Content>
				<Label>Checked</Label>
			</Switch.Content>
		</Switch>
		<Switch invalid>
			<Switch.Control />
			<Switch.Content>
				<Label>Invalid</Label>
			</Switch.Content>
		</Switch>
		<Switch disabled>
			<Switch.Control />
			<Switch.Content>
				<Label>Disabled</Label>
			</Switch.Content>
		</Switch>
		<Switch disabled checked>
			<Switch.Control />
			<Switch.Content>
				<Label>Disabled checked</Label>
			</Switch.Content>
		</Switch>
		<Switch>
			<Switch.Control />
			<Switch.Content>
				<Label>Lorem ipsum dolor sit</Label>
				<Text>Lorem ipsum dolor sit amet consectetur.</Text>
			</Switch.Content>
		</Switch>
		<Switch>
			<Switch.Content>
				<Switch.Control />
				Bare text
			</Switch.Content>
		</Switch>
		<Switch aria-label="Enable notifications">
			<Switch.Content>
				<Switch.Control />
			</Switch.Content>
		</Switch>
	</div>

	<div {...LIST}>
		<Switch size="sm" checked>
			<Switch.Control>
				<Switch.Thumb>
					<Switch.Icon />
				</Switch.Thumb>
			</Switch.Control>
			<Switch.Content>
				<Label>Size sm</Label>
			</Switch.Content>
		</Switch>
		<Switch size="md" checked>
			<Switch.Control>
				<Switch.Thumb>
					<Switch.Icon />
				</Switch.Thumb>
			</Switch.Control>
			<Switch.Content>
				<Label>Size md</Label>
			</Switch.Content>
		</Switch>
		<Switch size="lg" checked>
			<Switch.Control>
				<Switch.Thumb>
					<Switch.Icon />
				</Switch.Thumb>
			</Switch.Control>
			<Switch.Content>
				<Label>Size lg</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="pink">
			<Switch.Control>
				<Switch.Thumb>
					<Switch.Icon class="icon-[heroicons--heart-solid]" />
				</Switch.Thumb>
			</Switch.Control>
			<Switch.Content>
				<Label>Custom icon</Label>
			</Switch.Content>
		</Switch>
		<div dir="rtl">
			<Switch checked>
				<Switch.Control />
				<Switch.Content>
					<Label>RTL</Label>
				</Switch.Content>
			</Switch>
		</div>
	</div>

	<div {...LIST}>
		<Switch checked color="dark">
			<Switch.Control />
			<Switch.Content>
				<Label>dark</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="zinc">
			<Switch.Control />
			<Switch.Content>
				<Label>zinc</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="white">
			<Switch.Control />
			<Switch.Content>
				<Label>white</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="red">
			<Switch.Control />
			<Switch.Content>
				<Label>red</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="orange">
			<Switch.Control />
			<Switch.Content>
				<Label>orange</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="amber">
			<Switch.Control />
			<Switch.Content>
				<Label>amber</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="yellow">
			<Switch.Control />
			<Switch.Content>
				<Label>yellow</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="lime">
			<Switch.Control />
			<Switch.Content>
				<Label>lime</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="green">
			<Switch.Control />
			<Switch.Content>
				<Label>green</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="emerald">
			<Switch.Control />
			<Switch.Content>
				<Label>emerald</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="teal">
			<Switch.Control />
			<Switch.Content>
				<Label>teal</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="cyan">
			<Switch.Control />
			<Switch.Content>
				<Label>cyan</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="sky">
			<Switch.Control />
			<Switch.Content>
				<Label>sky</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="blue">
			<Switch.Control />
			<Switch.Content>
				<Label>blue</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="indigo">
			<Switch.Control />
			<Switch.Content>
				<Label>indigo</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="violet">
			<Switch.Control />
			<Switch.Content>
				<Label>violet</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="purple">
			<Switch.Control />
			<Switch.Content>
				<Label>purple</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="fuchsia">
			<Switch.Control />
			<Switch.Content>
				<Label>fuchsia</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="pink">
			<Switch.Control />
			<Switch.Content>
				<Label>pink</Label>
			</Switch.Content>
		</Switch>
		<Switch checked color="rose">
			<Switch.Control />
			<Switch.Content>
				<Label>rose</Label>
			</Switch.Content>
		</Switch>
	</div>
</div>
