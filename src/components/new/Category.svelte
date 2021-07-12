<script lang="ts">
	import { category, main } from '../../stores';
	import { colors } from '../../color';
	import type { CategoryStore } from '../../stores';
	import type { Color } from '../../color';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let id: string | undefined;
	export let parent: string | undefined;

	let c: CategoryStore | undefined = id ? category(id) : undefined;

	let name: string = c ? $c.name : '';
	let color: Color = c ? $c.color : undefined;

	function setColor(c: string | undefined) {
		(color as any) = c;
	}
	function create() {
		if (!id) {
			(parent ? category(parent) : main).pushCategory({
				name,
				items: [],
				categories: [],
				color,
			});
		} else {
			c?.setName(name);
		}
		dispatch('done');
	}
</script>

<form on:submit|preventDefault={create} class="new">
	<input type="text" bind:value={name} class="name" placeholder="Name" />
	<div class="colors">
		{#each colors as colorID}
			<div
				class={`color bg-${colorID} ${
					color == colorID ? 'color-selected' : ''
				}`}
				on:click={() => setColor(colorID)}
			/>
		{/each}
	</div>
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
	.colors {
		display: grid;
		grid-auto-flow: column;
		gap: 0.1rem;
	}
	.color {
		padding: 1rem;
		border-radius: 1rem;
		aspect-ratio: 1 / 1;
		transition-duration: 300ms;
		transition-timing-function: ease-out;
	}
	.color-selected {
		opacity: 0.4;
	}
	.bg-undefined {
		border: 1px solid #cccccc;
	}

	@media (prefers-color-scheme: dark) {
	}
</style>
