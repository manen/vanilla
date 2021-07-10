<script lang="ts">
	import { category as get } from '../../stores';
	import type { CategoryStore } from '../../stores';
	import List from '../../components/widget/List.svelte';

	export let id = '';
	let c: CategoryStore = get(id);
	$: c = get(id);
</script>

<div>
	<div class="widget">
		<div class="name">{$c.name}</div>
		<div class="desc">
			<div class="items-length">{$c.items.length} items</div>
			<div class="categories-length">{$c.items.length} subcategories</div>
		</div>
	</div>
	<List list={$c} />
</div>

<style>
	.widget {
		margin: 1rem;
		padding-top: 3rem;
		padding-bottom: 3rem;
		display: grid;
		place-content: center;
		text-align: center;
	}
	.name {
		font-size: 1.6rem;
		font-weight: bold;
	}
</style>
