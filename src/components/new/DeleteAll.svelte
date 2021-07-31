<script lang="ts">
	import { category, item, main } from '../../stores';
	import type { CategoryStore, MainStore } from '../../stores';

	import { createEventDispatcher } from 'svelte';
	import { flatItems } from '../../utils';
	const dispatch = createEventDispatcher();

	export let flat: boolean;
	export let id: string | undefined;
	let s: CategoryStore | MainStore;
	$: s = id ? category(id) : main;

	function dismiss() {
		dispatch('done');
	}
	function del() {
		(flat ? flatItems($s) : $s.items).forEach((iid) => {
			item(iid).subscribe((i) => {
				(i.parent ? category(i.parent) : main).removeItem(iid);
				console.log(i.parent, iid);
			})();
		});
		dismiss();
		location.reload(); // TODO make it not be shit
	}
</script>

<div class="delete">
	<button on:click={del}>yes</button>
	<button on:click={dismiss}>no</button>
</div>
