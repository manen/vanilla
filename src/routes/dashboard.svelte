<script lang="ts">
	import { main } from '../stores';
	import ItemWidget from '../components/widget/ItemWidget.svelte';
	import CategoryWidget from '../components/widget/CategoryWidget.svelte';
</script>

<div class="overview">
	<div>
		<h2 class="title">Items</h2>
		{#if $main.items.length > 0}
			<div class="items">
				{#each $main.items as id}
					<ItemWidget {id} />
				{/each}
			</div>
		{:else}
			<div class="empty">There's nothing here</div>
		{/if}
	</div>
	<div>
		<h2 class="title">Categories</h2>
		{#if $main.categories.length > 0}
			<div class="categories">
				{#each $main.categories as id}
					<CategoryWidget {id} />
				{/each}
			</div>
		{:else}
			<div class="empty">There's nothing here</div>
		{/if}
	</div>
</div>

<style>
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
</style>
