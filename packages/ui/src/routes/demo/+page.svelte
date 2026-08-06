<script lang="ts">
	import {
		Alert,
		Button,
		Form,
		Text,
		Input,
		Textarea,
		Select,
		Icon,
		Heading,
		Strong,
		Spinner,
		Chip,
		Link,
		Code
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
				<Form.Field auto name="party_size">
					<Form.Control>
						<Form.Label>Party size</Form.Label>
						<Input type="number" />
					</Form.Control>
					<Form.Error />
				</Form.Field>
				<Form.Field auto name="seating">
					<Form.Control>
						<Form.Label>Seating preference</Form.Label>
						<Select>
							<option value="indoor">Indoor</option>
							<option value="patio">Patio</option>
							<option value="bar">Bar</option>
						</Select>
					</Form.Control>
					<Form.Description>We currently only offer indoor, patio, or bar seating.</Form.Description
					>
					<Form.Error />
				</Form.Field>
				<Form.Field auto name="notes">
					<Form.Control>
						<Form.Label>Special requests</Form.Label>
						<Textarea />
					</Form.Control>
					<Form.Description
						>If you're celebrating something, we'd like to know about it.</Form.Description
					>
					<Form.Error />
				</Form.Field>
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
</div>
