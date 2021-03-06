<script lang="ts">
	import { Route, Router } from 'svelte-routing';
	import Header from './components/page/Header.svelte';
	import Index from './routes/index.svelte';
	import Dashboard from './routes/dashboard.svelte';
	import ItemID from './routes/item/[id].svelte';
	import CategoryID from './routes/category/[id].svelte';
	import Settings from './routes/settings.svelte';
	import Alert from './components/page/Alert.svelte';
	import { didJustMigrate, migrateIfNeeded } from './migrate';
	import { settings } from './stores';

	export let url = '';

	// SW
	let noSW = false;
	let swFail = false;
	if ('serviceWorker' in navigator) {
		(async () => {
			const registered =
				(await navigator.serviceWorker.getRegistrations()).length == 0;
			await navigator.serviceWorker.register('/sw.js');
			if (registered) location.reload();
		})().catch((e) => {
			// Snowpack doesn't make sw.js correctly so it will fail on localhost
			console.log(e);
			swFail = true && !location.href.includes('localhost');
		});
	} else {
		noSW = true;
	}

	// Migration
	let justMigrated: boolean;

	if (migrateIfNeeded()) {
		location.reload();
	} else {
		// we need this here, otherwise it would immediately trigger before the
		// refresh, and the popup would disappear after the reload
		justMigrated = didJustMigrate();
	}

	// Settings auto
	if (!$settings.joinDate) {
		$settings.joinDate = Date.now();
	}
</script>

<Header />
<main class="app">
	<Router {url}>
		<Route path="/" component={Index} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/item/:id" component={ItemID} />
		<Route path="/category/:id" component={CategoryID} />
		<Route path="/settings" component={Settings} />
	</Router>
</main>
<Alert
	text="Your browser does not support service workers. Vanilla won't be able to work offline"
	bind:visible={noSW}
/>
<Alert
	text="Vanilla's service worker failed to register. Vanilla won't be able to work offline"
	bind:visible={swFail}
/>
<Alert text="Data migrated." bind:visible={justMigrated} />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

	:global(button),
	:global(input) {
		background-color: hsl(0, 0%, 90%);
		padding: 1rem;
		padding-top: 0.65rem;
		padding-bottom: 0.65rem;
		border-width: 0px;
		border-radius: 0.6rem;
		font-size: 0.96rem;
		min-width: 0px;
	}

	:global(html),
	:global(body) {
		margin: 0px;
		padding: 0px;
		background-color: #ffffff;
		color: #000000;
		font-family: 'Roboto', sans-serif;
	}

	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		margin: 0px;
		padding: 0px;
	}

	:global(.pink) {
		color: #dd7373;
	}
	:global(.gray) {
		color: #5f5566;
	}
	:global(.green) {
		color: #70ae6e;
	}
	:global(.blue) {
		color: #48acf0;
	}
	:global(.gold) {
		color: #f6ca83;
	}
	:global(.bg-pink) {
		background-color: #dd7373;
	}
	:global(.bg-gray) {
		background-color: #5f5566;
	}
	:global(.bg-green) {
		background-color: #70ae6e;
	}
	:global(.bg-blue) {
		background-color: #48acf0;
	}
	:global(.bg-gold) {
		background-color: #f6ca83;
	}

	main {
		margin: 1rem;
	}

	@media (prefers-color-scheme: dark) {
		:global(html),
		:global(body) {
			background-color: #141516;
			color: #dddddd;
		}

		:global(button),
		:global(input) {
			background-color: hsl(210, 5%, 14%);
			color: #dddddd;
		}

		::-webkit-scrollbar {
			width: 15px;
		}
		::-webkit-scrollbar-track {
			background: #1a1a1a;
		}
		::-webkit-scrollbar-thumb {
			background: #242424;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #2a2a2a;
		}
	}
</style>
