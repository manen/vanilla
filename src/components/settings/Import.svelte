<script lang="ts">
	import { importData } from '../../migrate';
	import Alert from '../page/Alert.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let value = '';
	let fail = false;

	function dismiss() {
		dispatch('done');
	}
	async function click() {
		try {
			localStorage.clear();
			importData(value);
			location.reload();
			dismiss();
		} catch {
			fail = true;
		}
	}
</script>

<form on:submit|preventDefault={click} class="import">
	<div class="text">This will delete all your current data</div>
	<input type="text" placeholder="Exported data" bind:value />
	<button type="submit">Import</button>
</form>
<Alert text="Invalid data" bind:visible={fail} />

<style>
	.import {
		display: grid;
		gap: 0.6rem;
	}
	.text {
		margin-bottom: 0.35rem;
		text-align: center;
	}
</style>
