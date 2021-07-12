<script lang="ts">
	import { settings } from '../stores';

	import Popup from '../components/page/Popup.svelte';
	import Export from '../components/settings/Export.svelte';
	import Import from '../components/settings/Import.svelte';

	let exportVisible = false;
	let importVisible = false;

	function exportClick() {
		importVisible = false;
		exportVisible = true;
	}
	function importClick() {
		exportVisible = false;
		importVisible = true;
	}
</script>

<div class="settings">
	<button class="setting" on:click={exportClick}>Export data</button>
	<button class="setting" on:click={importClick}>Import data</button>
</div>
<div class="copyright-container">
	<div class="copyright">
		<div class="join-date">
			Joined {new Date($settings.joinDate || Date.now()).toLocaleDateString()} 🌱
		</div>
		Icons by Pixel Perfect and Freepik<span class="emoji">❤️</span>
	</div>
</div>
<Popup bind:visible={exportVisible} component={Export} />
<Popup bind:visible={importVisible} component={Import} />

<style>
	.settings {
		display: grid;
	}
	.setting {
		font-size: 1.05rem;
		margin: 0.2rem;
		padding: 1rem;
	}
	button.setting {
		/* transparent background */
		background-color: #00000000;
		text-align: left;
	}

	.copyright-container {
		position: fixed;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		bottom: 0.84rem;
		left: 0px;
		width: 100vw;
		text-align: center;
	}
	.copyright {
		color: #454545;
		font-size: 0.84rem;
	}
	.emoji {
		opacity: 0.6;
	}

	@media (prefers-color-scheme: dark) {
		.copyright {
			color: #999999;
		}
		.emoji {
			opacity: 0.45;
		}
	}
</style>
