<script lang="ts">
	import Switch from "../switch.svelte";

	const settings = {
		URL: "",
		extractAudio: false,
		restrictFilenames: true,
		audioFormat: "best",
		directory: "./static/music/",
		fileName: "%(title)s.%(ext)s",
	};

	let commandPreview = "";

	$: commandPreview = `yt-dlp ${
		settings.extractAudio
			? "-x " + "--audio-format " + settings.audioFormat
			: ""
	} '${settings.URL}' -o '${settings.directory}${settings.fileName}' ${
		settings.restrictFilenames ? "--restrict-filenames" : ""
	}`;

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

	const scrollToBottom = (node: any) => {
		const scroll = () =>
			node.scroll({
				top: node.scrollHeight,
				behavior: "smooth",
			});
		scroll();

		return { update: scroll };
	};
</script>

<div class="box p-4 col-span-full flex gap-4 items-center">
	<i class="i-heroicons:link text-2xl block" />
	<input
		class="bg-transparent border-none outline-none text-lg w-full"
		type="url"
		spellcheck="false"
		bind:value={settings.URL}
		placeholder="Enter Link"
	/>
</div>

<h2 class="col-span-full text-sm font-normal">
	Post-Processing Options
	<a
		class="text-[var(--text-scnd-color)] cursor-pointer"
		target="_blank"
		href="https://github.com/yt-dlp/yt-dlp#post-processing-options">docs</a
	>
</h2>

<label for="extract-audio" class="col-span-full flex items-center gap-4">
	<Switch id="extract-audio" bind:checked={settings.extractAudio} />
	<span>Extract Audio</span>
</label>
{#if settings.extractAudio}
	<select
		class="col-span-full box cursor-pointer outline-none p-4 text-lg"
		bind:value={settings.audioFormat}
	>
		<option value="best">best (default)</option>
		<option value="aac">aac</option>
		<option value="alac">alac</option>
		<option value="flac">flac</option>
		<option value="m4a">m4a</option>
		<option value="mp3">mp3</option>
		<option value="opus">opus</option>
		<option value="vorbis">vorbis</option>
		<option value="wav">wav</option>
	</select>
{/if}

<h2 class="col-span-full text-sm font-normal">
	Output Template
	<a
		class="text-[var(--text-scnd-color)] cursor-pointer"
		target="_blank"
		href="https://github.com/yt-dlp/yt-dlp#output-template">docs</a
	>
</h2>

<label for="restrict-filenames" class="col-span-full flex items-center gap-4">
	<Switch id="restrict-filenames" bind:checked={settings.restrictFilenames} />
	<span>Restrict Filenames</span>
</label>
<input
	class="box p-3 text-lg font-mono col-span-full md:col-span-1"
	bind:value={settings.directory}
	spellcheck="false"
	title="Basepath"
/>
<input
	class="box p-3 text-lg font-mono col-span-full md:col-span-1"
	bind:value={settings.fileName}
	spellcheck="false"
	title="Template"
/>

<h2 class="col-span-full font-normal text-sm">Generated Command</h2>
<div class="col-span-full box-dark font-mono">
	<div
		class="p-4 text-nowrap scrollbar scrollbar-rounded scrollbar-track-color-transparent border-b-solid b-2px b-[var(--bg-dark-b-color)]"
	>
		{commandPreview}
	</div>
	<div
		class="text-xs p-4 max-h-10vh md:max-h-30vh overflow-y-scroll scrollbar scrollbar-rounded scrollbar-track-color-transparent"
		use:scrollToBottom={arr}
	>
		{#each arr as el}
			<div>{el}</div>
		{/each}
	</div>
</div>

<button class="box p-2 col-span-full text-lg cursor-pointer" on:click={run}
	>Download</button
>
