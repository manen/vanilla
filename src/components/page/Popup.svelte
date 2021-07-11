<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { fade } from 'svelte/transition';
	import { sineIn, sineInOut } from 'svelte/easing';

	export let component: typeof SvelteComponent | undefined = undefined;
	export let props: Record<string, any> = {};
	export let visible = true;

	function hide() {
		visible = false;
	}
</script>

{#if visible}
	<div
		in:fade={{ duration: 200, easing: sineInOut }}
		out:fade={{ duration: 100, easing: sineIn }}
		on:click={hide}
		class="popup-container"
	>
		<div on:click|stopPropagation={() => {}} class="popup">
			{#if component}
				<svelte:component this={component} on:done={hide} {...props} />
			{:else}
				<slot {...props} />
			{/if}
		</div>
	</div>
{/if}

<style>
	.popup-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		display: grid;
		place-items: center;

		background-color: #ffffffaa;
		backdrop-filter: blur(0.16rem);
	}

	.popup {
		padding: 1rem;
		display: grid;
		place-items: center;
		background-color: hsl(0, 0%, 94%);
		border-radius: 1rem;
		max-width: 75vw;
	}

	@media (prefers-color-scheme: dark) {
		.popup-container {
			background-color: #000000aa;
		}

		.popup {
			background-color: hsl(210, 3%, 10%);
		}
	}
</style>
