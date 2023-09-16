<script lang="ts">
	import Button from '$lib/shared/ui/button/button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('sign-in');
	}
</script>

<div class="w-52">
	<Button
		on:click={handleClick}
		label="ОК"
		--pointer-events={disabled ? 'none' : 'auto'}
		--button-shadow-dark={disabled ? '#ccc' : '#540dee'}
		--button-shadow-light={disabled ? '#ccc' : '#d9d8d9'}
		--button-background-light={disabled ? '#ccc' : 'rgba(193, 109, 254, 1)'}
		--button-background-dark={disabled ? '#ccc' : 'rgba(154, 74, 254, 1)'}
		--button-shadow-static={disabled ? '#aaa' : '#7031fc'}
	/>
</div>
