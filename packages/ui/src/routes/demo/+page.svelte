<script lang="ts">
	import PHOTO from '../../lib/assets/placeholder_avatar.png';
	import {
		Alert,
		Avatar,
		AvatarGroup,
		Button,
		Checkbox,
		CheckboxField,
		Chip,
		Code,
		DescriptionList,
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

	let newsletter = $state(true);
	let items = $state([true, false, false]);
	const allChecked = $derived(items.every(Boolean));
	const someChecked = $derived(items.some(Boolean) && !allChecked);

	const lorem10 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sit.';

	const STACK = { class: '*:m-0 space-y-4!' };

	const LIST = { class: 'flex flex-row gap-4 flex-wrap basis' };
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

	<Form form={reservationForm}>
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
						Accept terms and conditions
					</Checkbox>
					<Field.Error />
				</CheckboxField>
			</Form.FieldGroup>
		</Form.Fieldset>
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
					{color}
					{#if index % 2 === 0}
						<Chip.Dismiss />
					{/if}
				</Chip>
			{/each}
		</div>
	{/each}

	<div class="h-256 w-64">
		<Sidebar>
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
			<Avatar>
				<Avatar.Image src={PHOTO} alt="John Doe" />
			</Avatar>
			<Avatar>
				<Avatar.Image src={PHOTO} alt="John Doe" />
			</Avatar>
			<Avatar>
				<Avatar.Image src={PHOTO} alt="John Doe" />
			</Avatar>
			<Avatar>
				<Avatar.Image src={PHOTO} alt="John Doe" />
			</Avatar>
			<Avatar>
				<Avatar.Image src={PHOTO} alt="John Doe" />
			</Avatar>
			<Avatar>
				<Avatar.Image src={PHOTO} alt="John Doe" />
			</Avatar>
		</AvatarGroup>

		<AvatarGroup max={3}>
			<Avatar>
				<Avatar.Image src={PHOTO} alt="John Doe" />
			</Avatar>
			<Avatar>
				<Avatar.Image src={PHOTO} alt="John Doe" />
			</Avatar>
		</AvatarGroup>

		<Avatar>
			<Avatar.Image src={PHOTO} alt="John Doe" />
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar>

		<Avatar>
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar>

		<Avatar>
			<Avatar.Image src="ERROR" alt="John Doe" />
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar>
	</div>

	<div {...LIST}>
		<Checkbox>
			<Checkbox.Control />
			Default
		</Checkbox>
		<Checkbox checked>
			<Checkbox.Control />
			Checked
		</Checkbox>
		<Checkbox indeterminate>
			<Checkbox.Control />
			Indeterminate
		</Checkbox>
		<Checkbox invalid>
			<Checkbox.Control />
			Invalid
		</Checkbox>
		<Checkbox disabled>
			<Checkbox.Control />
			Disabled
		</Checkbox>
		<Checkbox disabled checked>
			<Checkbox.Control />
			Disabled checked
		</Checkbox>
		<Checkbox disabled indeterminate>
			<Checkbox.Control />
			Disabled indeterminate
		</Checkbox>
		<Checkbox checked>
			<Checkbox.Control>
				<Icon icon="icon-[heroicons--heart-solid]" />
			</Checkbox.Control>
			Custom control content
		</Checkbox>
	</div>

	<div {...LIST}>
		<Checkbox checked color="dark">
			<Checkbox.Control />
			dark
		</Checkbox>
		<Checkbox checked color="zinc">
			<Checkbox.Control />
			zinc
		</Checkbox>
		<Checkbox checked color="white">
			<Checkbox.Control />
			white
		</Checkbox>
		<Checkbox checked color="red">
			<Checkbox.Control />
			red
		</Checkbox>
		<Checkbox checked color="orange">
			<Checkbox.Control />
			orange
		</Checkbox>
		<Checkbox checked color="amber">
			<Checkbox.Control />
			amber
		</Checkbox>
		<Checkbox checked color="yellow">
			<Checkbox.Control />
			yellow
		</Checkbox>
		<Checkbox checked color="lime">
			<Checkbox.Control />
			lime
		</Checkbox>
		<Checkbox checked color="green">
			<Checkbox.Control />
			green
		</Checkbox>
		<Checkbox checked color="emerald">
			<Checkbox.Control />
			emerald
		</Checkbox>
		<Checkbox checked color="teal">
			<Checkbox.Control />
			teal
		</Checkbox>
		<Checkbox checked color="cyan">
			<Checkbox.Control />
			cyan
		</Checkbox>
		<Checkbox checked color="sky">
			<Checkbox.Control />
			sky
		</Checkbox>
		<Checkbox checked color="blue">
			<Checkbox.Control />
			blue
		</Checkbox>
		<Checkbox checked color="indigo">
			<Checkbox.Control />
			indigo
		</Checkbox>
		<Checkbox checked color="violet">
			<Checkbox.Control />
			violet
		</Checkbox>
		<Checkbox checked color="purple">
			<Checkbox.Control />
			purple
		</Checkbox>
		<Checkbox checked color="fuchsia">
			<Checkbox.Control />
			fuchsia
		</Checkbox>
		<Checkbox checked color="pink">
			<Checkbox.Control />
			pink
		</Checkbox>
		<Checkbox checked color="rose">
			<Checkbox.Control />
			rose
		</Checkbox>
	</div>
</div>
