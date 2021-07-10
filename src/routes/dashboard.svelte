<script lang="ts">
	import { main } from '../stores';
	import List from '../components/widget/List.svelte';
</script>

<List list={$main} flat={true} />
