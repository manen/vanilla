<script lang="ts">
	import Install from '../components/settings/Install.svelte';
	import Alert from '../components/page/Alert.svelte';

	let reinstall = false;
	if (location.href.endsWith('?src=pwa')) {
		reinstall = true;
	}

	let installVisible = false;
	function install() {
		installVisible = true;
	}
</script>

<div class="index">
	<header class="header"><h1 class="header-text">Vanilla</h1></header>
	<div class="desc">
		Vanilla is a fast and lightweight, feature-rich yet intuitive modern
		shopping list and assistant.
	</div>
	<div class="install-container">
		<button class="install" on:click={install}>Install</button>
	</div>
	<Install bind:visible={installVisible} />
</div>
<Alert
	text="Due to a recent update, you have to reinstall Vanilla by navigating to vanilla.manen.me in your web browser."
	bind:visible={reinstall}
/>

<style>
	.index {
		/* very janky workaround to not have a header
		we all know this is gonna cause issues later uwu */
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;
	}
	.header {
		padding: 3rem;
		display: grid;
		place-items: center;
	}
	.desc {
		margin-left: 2rem;
		margin-right: 2rem;
		text-align: justify;
	}
	.install-container {
		position: fixed;
		width: 100vw;
		bottom: 0px;
		left: 0px;
		display: grid;
	}
	.install {
		margin: 1rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	@media (prefers-color-scheme: dark) {
		.index {
			background-color: #141516;
		}
	}
</style>
