<script lang="ts">
	import { onMount } from 'svelte';

	let count: number = 0;
	onMount(() => {
		const interval = setInterval(() => count++, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<main>hi</main>

<style>
	:global(body) {
		margin: 0px;
		padding: 0px;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
