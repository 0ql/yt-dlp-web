<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { File } from "./+page.server";
	import type { PUTRenameFileOrDir, DELETEFileOrDir } from "./+server"

	export let path: string
	export let file: File;

	$: newname = file.name;

	const dispatch = createEventDispatcher();

	const rename = async () => {
		await fetch("/files", {
			method: "PUT",
			body: JSON.stringify({
				oldpath: path + file.name + file.extension,
				newname: newname + file.extension
			} satisfies PUTRenameFileOrDir),
		});
	};

	const del = async () => {
		const res = await fetch("/files", {
			method: "DELETE",
			body: JSON.stringify({
				fullpath: '/' + file.name + file.extension,
			} satisfies DELETEFileOrDir),
		});
		if (res.ok) dispatch("deleted");
	};
</script>

<a
	class="box block p-4 w-full text-left flex items-center text-lg gap-3 cursor-pointer hover:bg-[var(--bg-trd-color)] hover:border-[var(--bg-trd-b-color)] no-underline"
	href="/music{path}{file.name + file.extension}"
>
	<!-- svelte-ignore a11y-missing-content -->
	<a
		class="i-heroicons:play-circle-solid inline-block text-3xl min-w-8"
	/>
	<input
		class="z-10 bg-transparent text-lg b-none w-full outline-none"
		spellcheck="false"
		bind:value={newname}
		on:change={rename}
		on:click|preventDefault
	/>
	<div>{file.extension.substring(1)}</div>
	<i
		class="i-heroicons:trash-solid text-2xl min-w-8 hover:text-[var(--highlight-color)]"
		on:click={del}
		tabindex="0"
		role="button"
		on:click|preventDefault
	/>
</a>
