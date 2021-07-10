/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mount: {
		public: { url: '/', static: true },
		src: { url: '/dist' },
	},
	plugins: [
		'@snowpack/plugin-svelte',
		'@snowpack/plugin-dotenv',
		[
			'@snowpack/plugin-typescript',
			{
				/* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
				...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
			},
		],
	],
	routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
	optimize: {
		bundle: true,
		sourcemap: false,
		splitting: true,
		treeshake: true,
		minify: true,
		target: 'es2020',
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		/* ... */
	},
};
