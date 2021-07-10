<script lang="ts">
	import { category, main } from '../../stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let parent: string | undefined;

	let name: string = '';

	function create() {
		(parent ? category(parent) : main).pushCategory({
			name,
			items: [],
			categories: [],
		});
		dispatch('done');
	}
</script>

<div class="new">
	<input type="text" bind:value={name} class="name" placeholder="Name" />
	<button type="submit" on:click={create} class="create">Create {name}</button>
</div>

<style>
	.new {
		display: grid;
		gap: 0.6rem;
	}
</style>
