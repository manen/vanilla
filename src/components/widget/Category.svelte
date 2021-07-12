<script lang="ts">
	import { category as get } from '../../stores';
	import { findColor } from '../../utils';
	import type { CategoryStore } from '../../stores';
	import type { Color } from '../../color';

	export let id = '';
	let c: CategoryStore = get(id);
	$: c = get(id);

	let co: Color | undefined = c ? findColor($c) : undefined;
	$: co = c ? findColor($c) : undefined;
</script>

<div class={`widget ${co || ''}`}>
	<div class="name">{$c.name}</div>
	<div class="details">
		<div class="items-length">
			{#if $c.items.length > 0}
				{$c.items.length} items
			{/if}
		</div>
		<div class="categories-length">
			{#if $c.categories.length > 0}
				{$c.categories.length} categories
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
