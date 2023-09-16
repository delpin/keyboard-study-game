<script lang="ts">
	import AuthenticationPage from '$lib/pages/authentication/ui/authentication-page.svelte';
	import type { FormType } from '$lib/widgets/authentication';
	export let form: FormType;
</script>

<AuthenticationPage {form} />
