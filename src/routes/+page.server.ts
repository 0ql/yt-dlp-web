import { readdirSync } from "fs";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
	let files: string[] = []
	readdirSync("./static/music").forEach(file => {
		files.push(file)
	});

	return {
		files
	}
}
