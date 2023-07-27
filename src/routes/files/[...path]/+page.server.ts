import { readdirSync } from "fs";
import type { PageServerLoad } from "./$types";
import path from "path";

export type File = {
	name: string
	extension: string
}

export type Dir = {
	basepath: string
	path: string
	dirs: string[]
	files: File[]
};

const getDir = (basepath: string, p: string): Dir => {
	const dir: Dir = {
		basepath,
		path: p === "" ? '/' : '/' + p + '/',
		dirs: [],
		files: [],
	};
	readdirSync(basepath + p, { withFileTypes: true }).forEach((d) => {
		if (d.isDirectory()) dir.dirs.push(d.name);
		else {
			const parsed = path.parse(basepath + p + '/' + d.name)
			dir.files.push({
				name: parsed.name,
				extension: parsed.ext
			})
		}
	});
	return dir;
};

export const load: PageServerLoad = async ({ params }) => {
	let dir = getDir('./static/music/', params.path)

	return dir
}

