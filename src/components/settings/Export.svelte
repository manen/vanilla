<script lang="ts">
	import { exportData } from '../../migrate';
	import { createEventDispatcher } from 'svelte';
	import Alert from '../page/Alert.svelte';
	const dispatch = createEventDispatcher();

	let copyFail = false;
	let exportFail = false;

	function dismiss() {
		dispatch('done');
	}
	async function click() {
		let data = '';
		try {
			data = exportData();
			try {
				await navigator.clipboard.writeText(data);
				dismiss();
			} catch {
				copyFail = true;
			}
		} catch (e) {
			exportFail = true;
			console.log(e);
		}
	}
</script>

<div class="export">
	<div class="text">
		You can copy and export of your data if you're moving to a new device, or
		want to create a backup.
	</div>
	<div class="buttons">
		<button class="dismiss" on:click={dismiss}>Cancel</button>
		<button on:click={click}>Copy</button>
	</div>
	<Alert
		text="Clipboard access is not available in your browser."
		visible={copyFail}
	/>
	<Alert text="Failed to export data" visible={exportFail} />
</div>

<style>
	.export {
		display: flex;
		flex-direction: column;
	}
	.text {
		margin-bottom: 1rem;
		text-align: center;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.dismiss {
		background-color: #00000000;
		color: #777777;
	}
</style>
