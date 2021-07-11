import {} from 'workbox-core';
import { NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';

const handler = new NetworkFirst({
	cacheName: 'cache-all',
});

registerRoute(({ request }) => request.destination != 'document', handler);

// since all documents are actually just index.html, this is some janky code
// that makes all our documents serve a cached index.html
registerRoute(
	({ request }) => request.destination == 'document',
	async (a) =>
		handler.handle({
			...a,
			url: '/',
			request: new Request('/', {
				...a.request,
				mode: 'cors',
			}),
		})
);
