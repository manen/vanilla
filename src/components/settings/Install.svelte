<script lang="ts">
	import { onDestroy } from 'svelte';
	import Popup from '../page/Popup.svelte';

	let event:
		| (Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> })
		| undefined;
	export let visible = false;

	function cancel() {
		visible = false;
	}
	function assignEvent(e: Event) {
		(event as any) = e;
	}
	async function install() {
		if (!event) return;

		event.prompt();
		const userChoice = await event.userChoice;
		console.log({ userChoice });
		const { outcome } = userChoice;

		event = undefined;
	}
	function installed() {
		visible = false;
	}

	window?.addEventListener('appinstalled', installed);
	onDestroy(() => window?.removeEventListener('appinstalled', installed));
</script>

<svelte:window on:beforeinstallprompt|preventDefault={assignEvent} />

<Popup bind:visible>
	<div class="install">
		<div class="text">
			Vanilla is a website that can be installed to your home screen, and can
			work offline.
		</div>
		<div class="buttons">
			<button on:click={cancel} class="cancel">Cancel</button><button
				on:click={install}>Install</button
			>
		</div>
	</div>
</Popup>

<style>
	.install {
		display: grid;
	}
	.text {
		margin-bottom: 1rem;
		text-align: center;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.cancel {
		background-color: #00000000;
		color: #777777;
	}
</style>
