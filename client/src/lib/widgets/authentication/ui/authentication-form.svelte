<script lang="ts">
	import AuthenticationPanel from '$lib/entities/authentication/ui/authentication-panel.svelte';
	import Login from '$lib/entities/authentication/ui/login.svelte';
	import SignIn from '$lib/entities/authentication/ui/sign-in.svelte';
	import { form, field } from 'svelte-forms';
	import { enhance } from '$app/forms';
	import { required } from 'svelte-forms/validators';
	import type { FormType } from '../model/FormType';
	import { goto } from '$app/navigation';
	export let error: FormType;

	const login = field('login', error?.username || '', [required()], { checkOnInit: true });
	const myForm = form(login);
	let isLoading = false;
</script>

<form
	method="POST"
	use:enhance={() => {
		isLoading = true;

		return async ({ update, result }) => {
			await update();
			isLoading = false;

			if (result.type === 'success') {
				goto('/game');
			}
		};
	}}
>
	<AuthenticationPanel>
		<Login bind:value={$login.value} error={error?.error} />
		<SignIn disabled={!$myForm.valid || isLoading} />
	</AuthenticationPanel>
</form>
