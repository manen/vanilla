<script lang="ts">
	import { category as get } from '../../stores';

	export let id = '';
	let category = get(id);
	$: category = get(id);
</script>

<div class="widget">
	<div class="name">{$category.name}</div>
	<div class="details">
		<div class="items-length">
			{#if $category.items.length > 0}
				{$category.items.length} items
			{/if}
		</div>
		<div class="categories-length">
			{#if $category.categories.length > 0}
				{$category.categories.length} categories
			{/if}
		</div>
	</div>
</div>

<style>
	.widget {
		padding-top: 2rem;
		padding-bottom: 2rem;
		display: grid;
		place-items: center;
		text-align: center;
	}

	.name {
		font-size: 1.1rem;
		font-weight: bold;
	}
	.details {
		font-size: 0.8rem;
	}
</style>
