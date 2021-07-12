<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { category, main } from '../../stores';
	import type { CategoryStore } from '../../stores';
	import { navigate } from 'svelte-routing';
	const dispatch = createEventDispatcher();

	export let id: string;
	let c: CategoryStore = category(id);
	$: c = category(id);

	function dismiss() {
		dispatch('done');
	}
	function del() {
		($c.parent ? category($c.parent) : main).removeCategory(id);
		navigate('/dashboard');
		dismiss();
	}
</script>

<div class="delete">
	<div class="text">
		Are you sure you want to delete {$c.name}?
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
