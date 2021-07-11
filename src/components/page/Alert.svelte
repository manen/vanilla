<script lang="ts">
	import Popup from './Popup.svelte';

	export let text: string;
	export let visible: boolean = true;

	function dismiss() {
		visible = false;
	}
</script>

<Popup bind:visible>
	<div class="alert">
		<div class="text">
			{text}
		</div>
		<button on:click={dismiss}>Ok</button>
	</div>
</Popup>

<style>
	.alert {
		display: flex;
		flex-direction: column;
	}
	.text {
		margin-bottom: 1rem;
		text-align: center;
	}
</style>
