<script lang="ts">
	import {
		Button,
		Checkbox,
		CheckboxField,
		Field,
		Form,
		Heading,
		Input,
		Label,
		Link,
		Strong,
		Text
	} from '../../../../lib/index.js';
	import { loginSchema } from '../../utils.js';
	import { untrack } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const form = superForm(
		untrack(() => data.form),
		{
			validators: zod4(loginSchema)
		}
	);
</script>

<main
	class="bg-neutral-primary-soft block border border-default rounded-base shadow w-full sm:max-w-md"
>
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<Heading level={4} as="h1">Sign in to your account</Heading>
		<Form {form}>
			<Form.FieldGroup>
				<Field auto name="email">
					<Label>Email</Label>
					<Input type="email" autocomplete="email" />
					<Field.Error />
				</Field>
				<Field auto name="password">
					<Label>Password</Label>
					<Input type="password" autocomplete="current-password" />
					<Field.Error />
				</Field>
				<div class="flex items-center justify-between *:m-0">
					<CheckboxField auto name="remember">
						<Checkbox>
							<Checkbox.Control />
							<Checkbox.Content>
								<Label>Remember me</Label>
							</Checkbox.Content>
						</Checkbox>
					</CheckboxField>
					<Text>
						<Link href="#">
							<Strong>Forgot password?</Strong>
						</Link>
					</Text>
				</div>
				<Button variant="primary" type="submit" class="w-full">Login</Button>
				<Text>
					Don’t have an account?
					<Link href="#">
						<Strong>Sign up</Strong>
					</Link>
				</Text>
			</Form.FieldGroup>
		</Form>
	</div>
</main>
