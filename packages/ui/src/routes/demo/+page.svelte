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
				<Label>Free shipping via Flowbite</Label>
				<Text>For orders shipped from $25 in books or $29 in other categories</Text>
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
				<Label>With description</Label>
				<Text>Get notified when someone mentions you.</Text>
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
