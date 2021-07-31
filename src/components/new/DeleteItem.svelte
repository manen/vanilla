<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { category, item, main } from '../../stores';
	import type { ItemStore } from '../../stores';
	import { navigate } from 'svelte-routing';
	const dispatch = createEventDispatcher();

	export let id: string;
	let i: ItemStore = item(id);
	$: i = item(id);

	function dismiss() {
		dispatch('done');
	}
	function del() {
		($i.parent ? category($i.parent) : main).removeItem(id);
		navigate('/dashboard');
		dismiss();
	}
</script>

<div class="delete">
	<div class="text">
		Are you sure you want to delete {$i.name}?
	</div>
	<div class="buttons">
		<button class="dismiss" on:click={dismiss}>Cancel</button>
		<button on:click={del}>Delete</button>
	</div>
</div>

<style>
	.delete {
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
