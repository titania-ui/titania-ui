<script lang="ts">
	import {
		Alert,
		Spinner,
		Heading,
		Text,
		Link,
		Strong,
		Button,
		Icon,
		Chip
	} from '../../lib/index.ts';
</script>

<Alert status="default">
	<Alert.Indicator />
	<Alert.Title>New features available</Alert.Title>
	<Alert.Description
		>Check out our latest updates including dark mode support and improved accessibility features.</Alert.Description
	>
</Alert>

<Alert status="info">
	<Alert.Indicator />
	<Alert.Title>Update available</Alert.Title>
	<Alert.Description
		>A new version of the application is available. Please refresh to get the latest features and
		bug fixes.</Alert.Description
	>
</Alert>

<Alert status="danger">
	<Alert.Indicator />
	<Alert.Title>Unable to connect to server</Alert.Title>
	<Alert.Description as="div">
		<p>We're experiencing connection issues. Please try the following:</p>
		<ul class="mt-2 list-inside list-disc space-y-1 text-sm">
			<li>Check your internet connection</li>
			<li>Refresh the page</li>
			<li>Clear your browser cache</li>
		</ul>
	</Alert.Description>
</Alert>

<Alert status="success">
	<Alert.Indicator />
	<Alert.Title>Profile updated successfully</Alert.Title>
	<Alert.Dismiss />
</Alert>

<Alert status="info">
	<Alert.Indicator>
		<Spinner />
	</Alert.Indicator>
	<Alert.Title>Processing your request</Alert.Title>
	<Alert.Description
		>Please wait while we sync your data. This may take a few moments.</Alert.Description
	>
</Alert>

<Alert status="warning">
	<Alert.Indicator />
	<Alert.Title>Scheduled maintenance</Alert.Title>
	<Alert.Description
		>Our services will be unavailable on Sunday, March 15th from 2:00 AM to 6:00 AM UTC for
		scheduled maintenance.</Alert.Description
	>
	<Alert.Dismiss />
</Alert>

<Heading level={1}>Heading 1</Heading>
<Heading level={2}>Heading 2</Heading>
<Heading level={3}>Heading 3</Heading>
<Heading level={4}>Heading 4</Heading>
<Heading level={5}>Heading 5</Heading>
<Heading level={6}>Heading 6</Heading>

<Text
	>Lorem, ipsum <Strong>dolor sit amet</Strong> consectetur adipisicing elit. Fugit impedit aliquid velit
	beatae mollitia enim fuga officiis fugiat autem accusantium! Ab labore ex commodi nihil atque adipisci
	harum earum ullam consequatur explicabo iusto, quae <Icon
		icon="icon-[noto--smiling-face-with-sunglasses]"
	/> soluta saepe nisi! Sed, fugiat optio ullam vero totam assumenda iste sint neque. <Link href="#"
		>Rem suscipit nihil</Link
	> optio ipsam laudantium numquam ipsa veritatis. Voluptas architecto dolorum laborum.</Text
>
<Text
	>Lorem, ipsum <Strong>dolor sit amet</Strong> consectetur adipisicing elit. Fugit impedit aliquid velit
	beatae mollitia enim fuga officiis fugiat autem accusantium! Ab labore ex commodi nihil atque adipisci
	harum earum ullam consequatur explicabo iusto, quae <Icon
		icon="icon-[noto--smiling-face-with-sunglasses]"
	/> soluta saepe nisi! Sed, fugiat optio ullam vero totam assumenda iste sint neque. <Link href="#"
		>Rem suscipit nihil</Link
	> optio ipsam laudantium numquam ipsa veritatis. Voluptas architecto dolorum laborum.</Text
>

<div class="my-4">
	<Button>Default</Button>
	<Button variant="primary">Primary</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="tertiary">Tertiary</Button>
	<Button variant="danger">Danger</Button>
	<Button variant="ghost">Ghost</Button>
</div>

{#each ['sm', 'md', 'lg'] as size (size)}
	<div class="my-4 space-y-1 space-x-2">
		{#each ['default', 'accent', 'success', 'warning', 'danger'] as color (color)}
			<Chip {size} {color}>{color}</Chip>
		{/each}
	</div>
{/each}

{#each ['sm', 'md', 'lg'] as size (size)}
	<div class="my-4 space-y-1 space-x-2">
		{#each ['default', 'accent', 'success', 'warning', 'danger'] as color (color)}
			<Chip {size} {color}><Icon icon="icon-[noto--smiling-face-with-sunglasses]" /> {color}</Chip>
		{/each}
	</div>
{/each}
