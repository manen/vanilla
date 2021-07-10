<script lang="ts">
	import { category, main } from '../../stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let parent: string | undefined;

	let name: string = '';
	let amount: number = 1;
	let unit: string = '';

	function create() {
		(parent ? category(parent) : main).pushItem({
			name,
			amount,
			unit,
		});
		dispatch('done');
	}
</script>

<div class="new">
	<input type="text" bind:value={name} class="name" placeholder="Name" />
	<input
		type="number"
		bind:value={amount}
		class="amount"
		placeholder="Amount"
	/>
	<input type="text" bind:value={unit} class="unit" placeholder="Unit" />
	<button type="submit" on:click={create} class="create">Create {name}</button>
</div>

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
