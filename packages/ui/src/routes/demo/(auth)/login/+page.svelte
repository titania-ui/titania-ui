<script lang="ts">
	import {
		Button,
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

<Form {form} class="grid w-full max-w-sm grid-cols-1 gap-8">
	<Heading level={2}>Sign in to your account</Heading>
	<Field auto name="email">
		<Label>Email</Label>
		<Input type="email" />
		<Field.Error />
	</Field>
	<Field auto name="password">
		<Label>Password</Label>
		<Input type="password" />
		<Field.Error />
	</Field>
	<div class="flex items-center justify-between">
		<Field auto name="remember">
			<Label>Remember me</Label>
			<Field.Error />
		</Field>
		<!--
			<CheckboxField>
				<Checkbox name="remember" />
				<Label>Remember me</Label>
			</CheckboxField>
		-->
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
</Form>
