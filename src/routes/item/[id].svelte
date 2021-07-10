<script lang="ts">
	import { item as get } from '../../stores';
	import type { ItemStore } from '../../stores';

	export let id = '';
	let i: ItemStore = get(id);
	$: i = get(id);
</script>

<div>
	<div class="widget">
		<div class="name">{$i.name}</div>
		<div class="amount">{$i.amount} <span class="unit">{$i.unit}</span></div>
	</div>
</div>

<style>
	.widget {
		margin: 1rem;
		padding-top: 3rem;
		padding-bottom: 3rem;
		display: grid;
		place-items: center;
	}
	.name {
		font-size: 1.6rem;
		font-weight: bold;
	}
</style>
