<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let file: any;

	let newname = file.name;

	const dispatch = createEventDispatcher();

	const rename = async () => {
		console.log("renaming", file.full, newname);
		await fetch("/files", {
			method: "PUT",
			body: JSON.stringify({
				oldname: file.full,
				newname,
				extension: file.extension,
			}),
		});
	};

	const del = async () => {
		console.log("deleteing");
		const res = await fetch("/files", {
			method: "DELETE",
			body: JSON.stringify({
				filename: file.full,
			}),
		});
		if (res.ok) dispatch("deleted");
	};
</script>

<button
	class="box block p-4 w-full text-left flex items-center text-lg gap-3 cursor-pointer"
>
	<a
		class="i-heroicons:play-circle-solid inline-block text-3xl min-w-8 hover:text-[var(--highlight-color)]"
		href="./music/{file.full}"
	/>
	<input
		class="bg-transparent text-lg b-none w-full outline-none"
		spellcheck="false"
		bind:value={newname}
		on:change={rename}
	/>
	<div>{file.extension.substring(1)}</div>
	<i
		class="i-heroicons:trash-solid text-2xl min-w-8 hover:text-[var(--highlight-color)]"
		on:click={del}
	/>
</button>
