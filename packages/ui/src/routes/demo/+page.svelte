<script lang="ts">
	import {
		Alert,
		Button,
		Text,
		Icon,
		Heading,
		Strong,
		Spinner,
		Chip,
		Link,
		Code,
		Form,
		Field,
		Label,
		Input,
		Textarea,
		Select,
		DescriptionList,
		Sidebar,
		InputGroup
	} from '../../lib/index.ts';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { untrack } from 'svelte';
	import { reservationSchema } from './utils.ts';

	let { data } = $props();

	const reservationForm = superForm(
		untrack(() => data.form),
		{
			validators: zod4(reservationSchema)
		}
	);

	const lorem10 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sit.';
</script>

<div class="space-y-12 p-6">
	<div>
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
		<div>
			{#each Object.keys(Button.theme.variants.variant) as variant (variant)}
				<Button
					variant={variant as keyof typeof Button.theme.variants.variant}
					size={size as keyof typeof Button.theme.variants.size}
					class="m-2"
				>
					<Icon icon="icon-[heroicons--inbox-solid]" />
					{variant}
				</Button>
			{/each}
			{#each Object.keys(Button.theme.variants.color) as color, index (color)}
				<Button
					color={color as keyof typeof Button.theme.variants.color}
					size={size as keyof typeof Button.theme.variants.size}
					class="m-2"
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

	<div>
		{#each Object.keys(Button.theme.variants.variant) as variant (variant)}
			<Button variant={variant as keyof typeof Button.theme.variants.variant} class="m-2" disabled>
				<Icon icon="icon-[heroicons--inbox-solid]" />
				{variant} disabled
			</Button>
		{/each}
		{#each Object.keys(Button.theme.variants.color) as color, index (color)}
			<Button color={color as keyof typeof Button.theme.variants.color} class="m-2" disabled>
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
			</Form.FieldGroup>
		</Form.Fieldset>
	</Form>

	<div>
		{#each Object.keys(Alert.theme.variants.status) as status (status)}
			<Alert status={status as keyof typeof Alert.theme.variants.status}>
				<Alert.Indicator />
				<Alert.Title>{status}</Alert.Title>
				<Alert.Description>{lorem10}</Alert.Description>
				<Alert.Dismiss />
			</Alert>
		{/each}
	</div>

	{#each Object.keys(Chip.theme.variants.size) as size (size)}
		<div>
			{#each Object.keys(Chip.theme.variants.color) as color, index (color)}
				<Chip
					color={color as keyof typeof Chip.theme.variants.color}
					size={size as keyof typeof Chip.theme.variants.size}
					class="m-2"
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
</div>
