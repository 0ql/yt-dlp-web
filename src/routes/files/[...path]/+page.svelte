<script lang="ts">
	import { page } from "$app/state";
	import File from "./file.svelte";
	import type { Dir } from "./+page.server";
	import Directory from "./directory.svelte";

	let { data }: { data: Dir } = $props();
</script>

{#if page.params.path !== ""}
	<a href="./" class="flex items-center gap-3 no-underline text-normal p-2">
		<i class="i-heroicons:arrow-left-solid inline-block text-2xl" />
		Back</a
	>
{/if}
<div class="grid grid-cols-1 md:grid-cols-2 col-span-full gap-4">
	{#if data.dirs.length === 0 && data.files.length === 0}
		<p class="text-gray-500">This directory is empty.</p>
	{/if}
	{#each data.dirs as dir, i}
		{#if dir}
			<Directory
				path={data.path}
				{dir}
				ondeleted={() => {
					delete data.dirs[i];
				}}
			/>
		{/if}
	{/each}
	{#each data.files as file, i}
		{#if file}
			<File
				path={data.path}
				{file}
				ondeleted={() => {
					delete data.files[i];
				}}
			/>
		{/if}
	{/each}
</div>
