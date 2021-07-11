import {} from 'workbox-core';
import { NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';

const handler = new NetworkFirst({
	cacheName: 'cache-all',
});

registerRoute(({ request }) => request.destination != 'document', handler);
registerRoute(
	({ request }) => request.destination == 'document',
	async (a) => {
		return handler.handle({
			...a,
			url: '/',
			request: new Request('/', {
				...a.request,
				mode: 'cors',
			}),
		});
	}
);
