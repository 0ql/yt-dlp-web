import { exec } from "child_process";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, url }) => {
	const { cmd }: { cmd: string } = await request.json()

	// const cmd = `yt-dlp ${settings.extractAudio ? "-x " + "--audio-format " + settings.audioFormat : ""} '${settings.URL}' -o './static/music/%(title)s.%(ext)s'`;
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
