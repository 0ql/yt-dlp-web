<script lang="ts">
	const settings = {
		URL: "",
		extractAudio: false,
		audioFormat: "opus",
	};

	let commandPreview = "";
	export let data: { files: string[] };

	$: commandPreview = `yt-dlp ${
		settings.extractAudio ? "-x " + "--audio-format " + settings.audioFormat : ""
	} '${settings.URL}'`;

	let arr: string[] = [];

	const run = async () => {
		let str =
			document.URL +
			"dl?URL=" +
			encodeURIComponent(settings.URL) +
			"&extractAudio=" +
			(settings.extractAudio ? "1" : "0") +
			"&audioFormat=" +
			settings.audioFormat;
		console.log(str);
		const res = await fetch(str);
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

<h1>YT DLP Web</h1>

<h2>Heruntergeladene Dateien</h2>
{#each data.files as file}
	<a style="display: block" href="./music/{file}">{file}</a>
{/each}

<h2>Einstellungen</h2>
<input bind:value={settings.URL} placeholder="Enter Youtube URL" />
<span>Extract Audio</span>
<input type="checkbox" bind:checked={settings.extractAudio} />
{#if settings.extractAudio}
	<select bind:value={settings.audioFormat}>
		<option value="opus">opus</option>
		<option value="mp3">mp3</option>
		<option value="m4a">m4a</option>
	</select>
{/if}
<button on:click={run}>Herunterladen</button>

<h2>Befehl</h2>
<span>{commandPreview}</span>

<h2>Log</h2>
{#each arr as el}
	<span>{el}</span>
{/each}

