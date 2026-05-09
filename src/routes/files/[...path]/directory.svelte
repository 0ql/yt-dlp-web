<script lang="ts">
	import type { PUTRenameFileOrDir, DELETEFileOrDir } from "./+server";

	let { path, dir: initialDir, ondeleted }: { path: string; dir: string; ondeleted: () => void } = $props();

	let dir = $state(initialDir);
	let newname = $state(initialDir);

	const rename = async () => {
		const res = await fetch("/files", {
			method: "PUT",
			body: JSON.stringify({
				oldpath: path + dir,
				newname,
			} satisfies PUTRenameFileOrDir),
		});
		if (!res.ok) {
			console.error("Failed to rename directory:", res.statusText);
			return;
		}
		dir = newname;
	};

	const del = async () => {
		const res = await fetch("/files", {
			method: "DELETE",
			body: JSON.stringify({
				fullpath: path + dir,
			} satisfies DELETEFileOrDir),
		});
		if (res.ok) ondeleted();
	};
</script>

<a
	class="box block p-4 w-full text-left flex items-center text-lg gap-3 cursor-pointer no-underline"
	href="/files{path}{dir}"
>
	<i class="i-heroicons:folder-solid inline-block text-2xl min-w-8" />
	<input
		class="bg-transparent text-lg b-none w-full outline-none"
		spellcheck="false"
		title="Directory Name"
		bind:value={newname}
		oninput={rename}
		onclick={(e) => e.preventDefault()}
	/>
	<button
		class="i-heroicons:trash-solid text-2xl min-w-8 hover:text-[var(--alert-color)] cursor-pointer"
		title="Delete Directory"
		onclick={(e) => { e.preventDefault(); del(); }}
	/>
</a>
