<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { PUTRenameFileOrDir, DELETEFileOrDir } from "./+server";

	export let path: string;
	export let dir: string;

	$: newname = dir;

	const dispatch = createEventDispatcher();

	const rename = async () => {
		await fetch("/files", {
			method: "PUT",
			body: JSON.stringify({
				oldpath: path + dir,
				newname,
			} satisfies PUTRenameFileOrDir),
		});
	};

	const del = async () => {
		const res = await fetch("/files", {
			method: "DELETE",
			body: JSON.stringify({
				fullpath: path + dir,
			} satisfies DELETEFileOrDir),
		});
		if (res.ok) dispatch("deleted");
	};
</script>

<a
	class="box block p-4 w-full text-left flex items-center text-lg gap-3 cursor-pointer hover:bg-[var(--bg-trd-color)] hover:border-[var(--bg-trd-b-color)] no-underline"
	href="/files{path}{dir}"
>
	<!-- svelte-ignore a11y-missing-content -->
	<a
		class="i-heroicons:folder-solid inline-block text-2xl min-w-8"
		data-sveltekit-preload-data="off"
	/>
	<input
		class="bg-transparent text-lg b-none w-full outline-none"
		spellcheck="false"
		bind:value={newname}
		on:change={rename}
		on:click|preventDefault
	/>
	<i
		class="i-heroicons:trash-solid text-2xl min-w-8 hover:text-[var(--highlight-color)]"
		on:click={del}
		tabindex="0"
		role="button"
		on:click|preventDefault
	/>
</a>
