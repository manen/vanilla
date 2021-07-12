<script lang="ts">
	import { category, item as get } from '../../stores';
	import type { ItemStore, CategoryStore } from '../../stores';
	import { findColor } from '../../utils';
	import type { Color } from '../../color';

	export let id = '';
	let item: ItemStore = get(id);
	$: item = get(id);

	let c: CategoryStore | undefined = $item.parent
		? category($item.parent)
		: undefined;
	$: c = $item.parent ? category($item.parent) : undefined;

	let co: Color | undefined = c ? findColor($c) : undefined;
	$: co = c ? findColor($c) : undefined;
</script>

<div class={`widget ${co || ''}`}>
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
