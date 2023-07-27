<script lang="ts">
	import { page } from "$app/stores";
	import File from "./file.svelte";
	import type { Dir } from "./+page.server";
	import Directory from "./directory.svelte";
	export let data: Dir;
</script>

{#if $page.params.path !== ""}
	<a href="./" class="flex items-center gap-3 no-underline text-normal p-2">
		<i class="i-heroicons:arrow-left-solid inline-block text-2xl" />
		Back</a
	>
{/if}
<div class="grid grid-cols-1 md:grid-cols-2 col-span-full gap-4">
	{#each data.dirs as dir, i}
		{#if dir}
			<Directory
				path={data.path}
				{dir}
				on:deleted={() => {
					delete data.dirs[i];
					data.dirs = data.dirs;
				}}
			/>
		{/if}
	{/each}
	{#each data.files as file, i}
		{#if file}
			<File
				path={data.path}
				{file}
				on:deleted={() => {
					delete data.files[i];
					data.files = data.files;
				}}
			/>
		{/if}
	{/each}
</div>
