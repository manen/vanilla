<script lang="ts">
	import { category as get } from '../../stores';
	import type { CategoryStore } from '../../stores';
	import List from '../../components/widget/List.svelte';
	import Actions from '../../components/page/Actions.svelte';
	import Popup from '../../components/page/Popup.svelte';
	import NewCategory from '../../components/new/Category.svelte';
	import DeleteCategory from '../../components/new/DeleteCategory.svelte';

	export let id = '';
	let c: CategoryStore = get(id);
	$: c = get(id);

	let editVisible = false;
	let delVisible = false;

	function edit() {
		delVisible = false;
		editVisible = true;
	}
	function del() {
		editVisible = false;
		delVisible = true;
	}
</script>

<div>
	<div class="widget">
		<div class="name">{$c.name}</div>
		<div class="desc">
			<div class="items-length">{$c.items.length} items</div>
			<div class="categories-length">{$c.items.length} subcategories</div>
		</div>
	</div>
	<List list={$c} {id} />
</div>
<Actions
	on:del={del}
	on:edit={edit}
	actions={{ edit: 'Edit', del: 'Delete' }}
/>
<Popup component={NewCategory} props={{ id }} bind:visible={editVisible} />
<Popup component={DeleteCategory} props={{ id }} bind:visible={delVisible} />

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
