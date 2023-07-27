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
	class="box block p-4 w-full text-left flex items-center text-lg gap-3 cursor-pointer no-underline"
	href="/files{path}{dir}"
>
	<i
		class="i-heroicons:folder-solid inline-block text-2xl min-w-8"
	/>
	<input
		class="bg-transparent text-lg b-none w-full outline-none"
		spellcheck="false"
		title="Directory Name"
		bind:value={newname}
		on:change={rename}
		on:click|preventDefault
	/>
	<button
		class="i-heroicons:trash-solid text-2xl min-w-8 hover:text-[var(--alert-color)] cursor-pointer"
		title="Delete Directory"
		on:click|preventDefault={del}
	/>
</a>
