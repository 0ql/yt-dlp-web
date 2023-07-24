import { readdirSync } from "fs";
import type { PageServerLoad } from "./$types";
import path from "path";

export const load: PageServerLoad = () => {
	let files: { full: string, name: string, extension: string }[] = []
	readdirSync("./static/music").forEach(file => {
		const parsed = path.parse("./static/music/" + file)
		files.push({ full: file, name: parsed.name, extension: parsed.ext })
	});

	return {
		files
	}
}

