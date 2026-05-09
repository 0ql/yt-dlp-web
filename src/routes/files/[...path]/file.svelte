<script lang="ts">
	import type { File } from "./+page.server";
	import type { PUTRenameFileOrDir, DELETEFileOrDir } from "./+server";

	let { path, file, ondeleted }: { path: string; file: File; ondeleted: () => void } = $props();

	let newname = $state(file.name);

	const rename = async () => {
		console.log(
			"Renaming file",
			path + file.name + file.extension,
			"to",
			newname + file.extension,
		);
		const res = await fetch("/files", {
			method: "PUT",
			body: JSON.stringify({
				oldpath: path + file.name + file.extension,
				newname: path + newname + file.extension,
			} satisfies PUTRenameFileOrDir),
		});
		if (!res.ok) console.error("Failed to rename file:", res.statusText);
		file.name = newname;
	};

	const del = async () => {
		console.log("Deleting file", path + file.name + file.extension);
		const res = await fetch("/files", {
			method: "DELETE",
			body: JSON.stringify({
				fullpath: path + file.name + file.extension,
			} satisfies DELETEFileOrDir),
		});
		if (res.ok) ondeleted();
	};
</script>

<a
	class="box block p-4 w-full text-left flex items-center text-lg gap-3 cursor-pointer hover:bg-[var(--bg-trd-color)] hover:border-[var(--bg-trd-b-color)] no-underline"
	href="/music{path}{encodeURI(file.name + file.extension)}"
>
	<i class="i-heroicons:play-circle-solid inline-block text-3xl min-w-8" />
	<input
		class="z-10 bg-transparent text-lg b-none w-full outline-none"
		spellcheck="false"
		title="Filename"
		bind:value={newname}
		oninput={rename}
		onclick={(e) => e.preventDefault()}
	/>
	<div>{file.extension.substring(1)}</div>
	<button
		class="i-heroicons:trash-solid text-2xl min-w-8 hover:text-[var(--alert-color)] cursor-pointer"
		title="Delete File"
		onclick={(e) => { e.preventDefault(); del(); }}
	/>
</a>
