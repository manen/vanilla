<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let actions: Record<string, string>;
	function click(id: string) {
		dispatch(id);
	}
</script>

<div class="actions-container">
	<div class="actions">
		{#each Object.entries(actions) as [id, name]}
			<button class="action" on:click={() => click(id)}>{name}</button>
		{/each}
	</div>
</div>

<style>
	.actions-container {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100vw;
	}
	.actions {
		margin: 0.6rem;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		gap: 0.6rem;
	}
	.action {
		width: 100%;
	}
</style>
