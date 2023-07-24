<script lang="ts">
    import Switch from "../switch.svelte";

	const settings = {
		URL: "",
		extractAudio: false,
		audioFormat: "opus",
		directory: "./static/music/",
		fileName: "%(title)s.%(ext)s",
	};

	let commandPreview = "";

	$: commandPreview = `yt-dlp ${
		settings.extractAudio
			? "-x " + "--audio-format " + settings.audioFormat
			: ""
	} '${settings.URL}' -o '${settings.directory}${settings.fileName}'`;

	let arr: string[] = [];

	const run = async () => {
		const res = await fetch("/download", {
			method: "POST",
			body: JSON.stringify({ cmd: commandPreview }),
		});
		const reader = res.body?.getReader();
		if (!reader) {
			console.error("couldn't get reader");
			return;
		}
		let readRes: ReadableStreamReadResult<Uint8Array>;
		do {
			console.log("waiting..");
			readRes = await reader.read();
			console.log("recieved..");
			arr.push(new TextDecoder().decode(readRes.value));
			arr = arr;
		} while (!readRes.done);
		console.log("done");
		arr.push("done");
	};
</script>

<div class="box p-4 col-span-full flex gap-4 items-center">
	<i class="i-heroicons:link text-2xl block" />
	<input
		class="bg-transparent border-none outline-none text-lg w-full"
		spellcheck="false"
		bind:value={settings.URL}
		placeholder="Enter Link"
	/>
</div>

<div class="col-span-full flex items-center gap-4">
	<Switch bind:checked={settings.extractAudio} />
	<span>Extract Audio</span>
</div>
{#if settings.extractAudio}
	<select
		class="col-span-full box cursor-pointer outline-none p-4 text-lg"
		bind:value={settings.audioFormat}
	>
		<option value="opus">opus</option>
		<option value="mp3">mp3</option>
		<option value="m4a">m4a</option>
	</select>
{/if}

<h2 class="col-span-full text-sm font-normal">
	Output file format
	<a
		class="text-[var(--text-scnd-color)] cursor-pointer"
		href="https://github.com/yt-dlp/yt-dlp#output-template">docs</a
	>
</h2>
<input
	class="box p-3 text-lg font-mono disabled:text-[var(--text-scnd-color)]"
	bind:value={settings.directory}
	disabled
/>
<input
	class="box p-3 text-lg font-mono focus:outline-solid outline-2px focus:outline-[var(--highlight-color)]"
	bind:value={settings.fileName}
/>

<h2 class="col-span-full font-normal text-sm">Generated Command</h2>
<div class="col-span-full box-dark font-mono">
	<div
		class="p-4 text-nowrap scrollbar scrollbar-rounded scrollbar-track-color-transparent border-b-solid b-2px b-[var(--bg-dark-b-color)]"
	>
		{commandPreview}
	</div>
	<div
		class="text-xs p-4 max-h-10vh md:max-h-30vh overflow-y-scroll scrollbar scrollbar-track-color-transparent"
	>
		{#each arr as el}
			<div>{el}</div>
		{/each}
	</div>
</div>

<button
	class="col-span-full bg-[var(--highlight-color)] b-none p-2 rounded-lg text-white text-lg cursor-pointer"
	on:click={run}>Download</button
>

