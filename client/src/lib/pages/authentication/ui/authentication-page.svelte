<script lang="ts">
	import type { FormType } from '$lib/widgets/authentication/model/FormType';
	import AuthenticationForm from '$lib/widgets/authentication/ui/authentication-form.svelte';
	export let form: FormType;
</script>

<div class="w-screen h-screen wrapper">
	<div class="flex justify-center items-center h-full">
		<AuthenticationForm error={form} />
	</div>
</div>

<style>
	.wrapper {
		background: radial-gradient(50% 50% at 50% 50%, #a659fe 0%, #6f53fd 100%);
	}
</style>
