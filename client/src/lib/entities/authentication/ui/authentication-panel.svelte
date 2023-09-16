<script lang="ts">
	import FormPanel from '$lib/shared/ui/form-panel/form-panel.svelte';
</script>

<FormPanel label="AUTH">
	<div class="w-full flex flex-1 flex-col gap-12 items-center justify-end p-7 pb-12">
		<slot />
	</div>
</FormPanel>
