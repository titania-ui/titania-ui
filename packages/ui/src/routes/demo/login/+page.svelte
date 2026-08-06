<script lang="ts">
	import { Button, Form, Heading, Link, Strong, Text, Input } from '../../../lib/index.ts';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { untrack } from 'svelte';
	import { loginSchema } from '../utils.ts';

	let { data } = $props();

	const form = superForm(
		untrack(() => data.form),
		{
			validators: zod4(loginSchema)
		}
	);
</script>

<Form {form} class="grid w-full max-w-sm grid-cols-1 gap-8">
	<Heading>Sign in to your account</Heading>
	<Form.Field auto name="email">
		<Form.Control>
			<Form.Label>Email</Form.Label>
			<Input type="email" />
		</Form.Control>
		<Form.Error />
	</Form.Field>
	<Form.Field auto name="password">
		<Form.Control>
			<Form.Label>Password</Form.Label>
			<Input type="password" />
		</Form.Control>
		<Form.Error />
	</Form.Field>
	<div class="flex items-center justify-between">
		<Form.Field auto name="remember">
			<Form.Control>
				<Form.Label>Remember me</Form.Label>
			</Form.Control>
			<Form.Error />
		</Form.Field>
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
