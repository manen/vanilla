import App from './App.svelte';

// HMR
if (import.meta.hot) {
	import.meta.hot.accept();
	import.meta.hot.dispose(() => {
		app.$destroy();
	});
}

// Svelte
var app = new App({
	target: document.body,
});
export default app;
