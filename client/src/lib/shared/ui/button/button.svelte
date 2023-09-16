<script lang="ts">
	export let label: string = '';
</script>

<div class="flex border-white border-4 rounded-3xl pb-2">
	<button type="submit" class="w-full rounded-3xl text-white py-3 text-2xl font-bold" on:click>
		{label}
	</button>
</div>

<style>
	button {
		pointer-events: var(--pointer-events, 'auto');
		background: linear-gradient(
			125deg,
			var(--button-background-light) 48%,
			var(--button-background-dark) 48%
		);
		box-shadow: 0px 4px 0px 2px var(--button-shadow-static);
	}

	button:hover {
		background: linear-gradient(
			125deg,
			var(--button-background-dark) 0%,
			var(--button-background-dark) 100%
		);
	}

	button:active {
		box-shadow: 0px 4px 0px 0px var(--button-shadow-dark);
		margin-bottom: -4px;
		margin-top: 4px;
	}

	div {
		box-shadow: 0px 3px 0px 0px var(--button-shadow-light);
	}
</style>
