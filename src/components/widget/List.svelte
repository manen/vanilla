<script lang="ts">
	import { link } from 'svelte-routing';
	import CategoryWidget from './CategoryWidget.svelte';
	import ItemWidget from './ItemWidget.svelte';

	import { flatItems } from '../../utils';
	import type { List } from '../../stores';

	export let list: List;
	export let flat: boolean = false;
</script>

<div class="overview">
	<div>
		<h2 class="title">
			{#if flat}
				All items
			{:else}
				Items
			{/if}
		</h2>
		{#if (flat ? flatItems(list) : list.items).length > 0}
			<div class="items">
				{#each flat ? flatItems(list) : list.items as id}
					<a use:link href="/item/{id}"><ItemWidget {id} /></a>
				{/each}
			</div>
		{:else}
			<div class="empty">There's nothing here</div>
		{/if}
	</div>
	<div>
		<h2 class="title">Categories</h2>
		{#if list.categories.length > 0}
			<div class="categories">
				{#each list.categories as id}
					<a use:link href="/category/{id}"><CategoryWidget {id} /></a>
				{/each}
			</div>
		{:else}
			<div class="empty">There's nothing here</div>
		{/if}
	</div>
</div>

<style>
	a {
		color: #000000;
		text-decoration: none;
	}

	.items,
	.categories {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	.title {
		font-size: 1.4rem;
	}
	.empty {
		padding: 1.4rem;
		display: grid;
		place-items: center;
		color: #87878d;
	}

	@media (prefers-color-scheme: dark) {
		a {
			color: #dddddd;
		}
	}
</style>
