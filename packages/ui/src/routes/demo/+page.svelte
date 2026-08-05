<script lang="ts">
	import { Button, Form, Text, Input, Textarea, Select, Icon } from '../../lib/index.ts';
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
</script>

<div class="space-y-12 p-6">
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
			{#each Object.keys(Button.theme.variants.color) as color (color)}
				<Button
					color={color as keyof typeof Button.theme.variants.color}
					size={size as keyof typeof Button.theme.variants.size}
					class="m-2"
				>
					{color}
				</Button>
			{/each}
		</div>
	{/each}

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
</div>
