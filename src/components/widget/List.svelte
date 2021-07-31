<script lang="ts">
	import { link } from 'svelte-routing';
	import CategoryWidget from './Category.svelte';
	import ItemWidget from './Item.svelte';

	import { flatItems } from '../../utils';
	import type { List } from '../../stores';
	import Popup from '../page/Popup.svelte';
	import NewItem from '../new/Item.svelte';
	import NewCategory from '../new/Category.svelte';
	import DeleteAll from '../new/DeleteAll.svelte';

	export let list: List;
	export let id: string | undefined = undefined;
	export let flat: boolean = false;

	let mock = 0;

	let newItemVisible = false;
	let newCategoryVisible = false;
	let deleteAllVisible = false;

	function newItemClick() {
		newCategoryVisible = false;
		deleteAllVisible = false;
		newItemVisible = true;
	}
	function newCategoryClick() {
		newItemVisible = false;
		deleteAllVisible = false;
		newCategoryVisible = true;
	}
	function deleteAllClick() {
		newItemVisible = false;
		newCategoryVisible = false;
		deleteAllVisible = true;
	}
</script>

<div style="display: none;">
	{mock}
</div>
<div class="overview">
	<div>
		<div class="title">
			<h2 class="title-text">
				{#if flat}
					All items
				{:else}
					Items
				{/if}
			</h2>
			<div class="new-container">
				<button class="new" on:click={deleteAllClick}>Delete</button>
				<button class="new" on:click={newItemClick}>New</button>
			</div>
		</div>
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
		<div class="title">
			<h2 class="title-text">Categories</h2>
			<div class="new-container">
				<button class="new" on:click={newCategoryClick}>New</button>
			</div>
		</div>
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
<Popup
	component={NewItem}
	bind:visible={newItemVisible}
	props={{ parent: id }}
/>
<Popup
	component={NewCategory}
	bind:visible={newCategoryVisible}
	props={{ parent: id }}
/>
<Popup
	component={DeleteAll}
	bind:visible={deleteAllVisible}
	props={{ id, flat }}
/>

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
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.title-text {
		font-size: 1.4rem;
	}
	.new-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: 0.3rem;
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
