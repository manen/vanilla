<script lang="ts">
	import { Route, Router } from 'svelte-routing';
	import Header from './components/page/Header.svelte';
	import Index from './routes/index.svelte';

	export let url = '';
</script>

<Header />
<div class="app">
	<Router {url}>
		<Route path="/" component={Index} />
	</Router>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0px;
		padding: 0px;
		background-color: #ffffff;
		color: #000000;
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
