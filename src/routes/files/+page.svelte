<script lang="ts">
	import File from "./file.svelte";
	export let data: any;

	let cols = true;
</script>

<div class="col-span-full py-4">
	<button
		class="flex items-center gap-3 bg-transparent b-none cursor-pointer"
		on:click={() => (cols = !cols)}
	>
		<i class="i-heroicons:squares-2x2-solid inline-block text-2xl" />
		Change View
	</button>
</div>
<div class="grid grid-cols-1 grid-cols-{cols ? '2' : ''} col-span-full gap-4">
	{#each data.files as file, i}
		{#if file}
			<File
				{file}
				on:deleted={() => {
					delete data.files[i];
					data.files = data.files;
				}}
			/>
		{/if}
	{/each}
</div>
