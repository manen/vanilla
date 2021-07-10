<script lang="ts">
	import { Route, Router } from 'svelte-routing';
	import Header from './components/page/Header.svelte';
	import Index from './routes/index.svelte';
	import Dashboard from './routes/dashboard.svelte';
	import ItemID from './routes/item/[id].svelte';
	import CategoryID from './routes/category/[id].svelte';
	import Settings from './routes/settings.svelte';

	export let url = '';
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

<style>
	main {
		margin: 1rem;
	}

	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

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

	@media (prefers-color-scheme: dark) {
		:global(html),
		:global(body) {
			background-color: #141516;
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
