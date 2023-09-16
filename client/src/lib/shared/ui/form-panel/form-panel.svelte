<script lang="ts">
	import Ribbon from './assets/ribbon.png';

	export let label: string = '';
</script>

<div class=" panel-wrap rounded-3xl pb-1">
	<div class="flex flex-col w-80 h-96 bg-white rounded-3xl panel">
		<div class="ribbon-wrap relative">
			<img class="ribbon" src={Ribbon} alt="download icon" />
			<div class="absolute label text-white text-3xl">{label}</div>
		</div>
		<slot />
	</div>
</div>

<style>
	.panel {
		box-shadow: 0px 4px 0px 0px #ccc;
	}

	.panel-wrap {
		box-shadow: 0px 4px 0px 0px #540deed5;
	}

	.ribbon-wrap {
		width: 110%;
		margin-top: -45px;
		margin-left: -15px;
	}

	.label {
		top: 25px;
		left: 50%;
		transform: translate(-50%, 0);
		text-shadow: 0px 4px 7px #b81682;
	}
</style>
