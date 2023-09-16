<script lang="ts">
	export let placeholder: string = '';
	export let label: string = '';
	export let value: string = '';
	export let name: string = '';
</script>

<div class="flex w-full items-center flex-col">
	<div class=" text-2xl mb-1 label">
		{label}
	</div>
	<input
		class="font-medium text-2xl w-full leading-10 rounded-3xl px-4 text-center py-2"
		bind:value
		{name}
		{placeholder}
	/>
</div>

<style>
	.label {
		color: #60cfff;
	}

	input {
		color: #228aed;
		background: var(--bg-input, #c2fdff);
		border: 2px solid var(--bg-input-border, #c2fdff);
	}

	input::placeholder {
		color: #60cfff;
	}
</style>
