<script lang="ts">
	import { link } from 'svelte-routing';
</script>

<header>
	<a class="title" use:link href="/dashboard">Vanilla</a>
	<div class="buttons">
		<a use:link href="/settings"
			><img class="button" src="/icons/settings.svg" alt="Settings button" /></a
		>
	</div>
</header>

<style>
	header {
		padding: 0.6rem;
		display: grid;
		grid-template-columns: 1fr 9fr;

		background-color: #eeeeee;
	}

	.title {
		display: grid;
		place-items: center;
		font-size: 1.16rem;
		color: #464646;
		text-decoration: none;
	}

	.buttons {
		display: grid;
		gap: 0.6rem;
		grid-template-columns: 1.6rem;
		justify-content: right;
	}
	.button {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		opacity: 0.64;
	}

	@media (prefers-color-scheme: dark) {
		header {
			background-color: #1a1b1c;
		}

		.title {
			color: #afaeae;
		}

		.button {
			filter: invert(1);
		}
	}
</style>
