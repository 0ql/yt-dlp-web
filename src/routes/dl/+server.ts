import { exec } from "child_process";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
	const settings = {
		URL: "",
		extractAudio: false,
		audioFormat: "opus"
	};
	settings.URL = url.searchParams.get("URL") ?? "";
	if (!settings.URL)
		return new Response();
	settings.extractAudio = url.searchParams.get("extractAudio") === "1" ? true : false;

	const cmd = `yt-dlp ${settings.extractAudio ? "-x " + "--audio-format " + settings.audioFormat : ""} '${settings.URL}' -o './static/music/%(title)s.%(ext)s'`;
	console.log(cmd)
	const cp = exec(cmd);
	let stream = new ReadableStream({
		start(controller) {
			cp.stdout?.on('data', data => {
				console.log(data)
				controller.enqueue(data);
			})
			cp.stdout?.on('close', () => {
				console.log('closing')
				controller.close();
			})
		}
	})
	return new Response(stream);
}
