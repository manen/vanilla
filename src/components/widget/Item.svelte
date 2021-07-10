<script lang="ts">
	import { item as get } from '../../stores';
	import type { ItemStore } from '../../stores';

	export let id = '';
	let item: ItemStore = get(id);
	$: item = get(id);
</script>

<div class="widget">
	<div class="name">{$item.name}</div>
	<div class="amount">
		{#if $item.amount > 1 || $item.unit}
			{$item.amount} <span class="unit">{$item.unit}</span>
		{/if}
	</div>
</div>

<style>
	.widget {
		padding-top: 2rem;
		padding-bottom: 2rem;
		display: grid;
		place-items: center;
	}

	.name {
		font-size: 1.1rem;
		font-weight: bold;
	}
	.amount {
		font-size: 0.8rem;
	}
</style>
