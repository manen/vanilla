<script lang="ts">
	import { category, main } from '../../stores';
	import type { CategoryStore } from '../../stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let id: string | undefined;
	export let parent: string | undefined;

	let c: CategoryStore | undefined = id ? category(id) : undefined;

	let name: string = c ? $c.name : '';

	function create() {
		if (!id) {
			(parent ? category(parent) : main).pushCategory({
				name,
				items: [],
				categories: [],
			});
		} else {
			c?.setName(name);
		}
		dispatch('done');
	}
</script>

<form on:submit|preventDefault={create} class="new">
	<input type="text" bind:value={name} class="name" placeholder="Name" />
	<button type="submit" class="create">
		{#if !id}
			Create
		{:else}
			Edit
		{/if}
		{name}</button
	>
</form>

<style>
	.new {
		display: grid;
		gap: 0.6rem;
	}
</style>
