<script lang="ts">
	import Input from '$lib/shared/ui/input/input.svelte';

	export let value = '';
	export let error = '';
</script>

<Input
	placeholder="Insert login"
	bind:value
	label="Login"
	name="username"
	--bg-input-border={error ? 'red' : '#c2fdff'}
/>
