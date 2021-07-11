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

<form on:submit|preventDefault={create} class="new">
	<input type="text" bind:value={name} class="name" placeholder="Name" />
	<button type="submit" class="create">Create {name}</button>
</form>

<style>
	.new {
		display: grid;
		gap: 0.6rem;
	}
</style>
