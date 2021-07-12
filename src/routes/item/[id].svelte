<script lang="ts">
	import { item as get } from '../../stores';
	import type { ItemStore } from '../../stores';
	import Actions from '../../components/page/Actions.svelte';
	import Popup from '../../components/page/Popup.svelte';
	import NewItem from '../../components/new/Item.svelte';
	import DeleteItem from '../../components/new/DeleteItem.svelte';

	export let id = '';
	let i: ItemStore = get(id);
	$: i = get(id);

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
		<div class="name">{$i.name}</div>
		<div class="amount">{$i.amount} <span class="unit">{$i.unit}</span></div>
	</div>
</div>
<Actions
	on:edit={edit}
	on:del={del}
	actions={{ edit: 'Edit', del: 'Delete' }}
/>
<Popup component={NewItem} props={{ id }} bind:visible={editVisible} />
<Popup component={DeleteItem} props={{ id }} bind:visible={delVisible} />

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
