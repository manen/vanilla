<script lang="ts">
	import { category, item, main } from '../../stores';
	import type { ItemStore } from '../../stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let id: string | undefined;
	export let parent: string | undefined;

	let i: ItemStore | undefined = id ? item(id) : undefined;

	let name: string = i ? $i.name : '';
	let amount: number = i ? $i.amount : 1;
	let unit: string = i ? $i.unit : '';

	function create() {
		if (!id) {
			(parent ? category(parent) : main).pushItem({
				name,
				amount,
				unit,
			});
		} else {
			i?.set({ name, amount, unit });
		}
		dispatch('done');
	}
</script>

<form on:submit|preventDefault={create} class="new">
	<input type="text" bind:value={name} class="name" placeholder="Name" />
	<input
		type="number"
		bind:value={amount}
		class="amount"
		placeholder="Amount"
	/>
	<input type="text" bind:value={unit} class="unit" placeholder="Unit" />
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
		grid-template:
			'a a a' 40px
			'b b c' 40px
			'd d d' 40px / 1fr 1fr 1fr;
	}
	.name {
		grid-area: a;
	}
	.amount {
		grid-area: b;
	}
	.unit {
		grid-area: c;
	}
	.create {
		grid-area: d;
	}
</style>
