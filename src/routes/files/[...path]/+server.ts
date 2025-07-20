import { renameSync, rmSync } from "fs";
import type { RequestHandler } from "./$types";

export type PUTRenameFileOrDir = {
	oldpath: string
	newname: string
};

export type DELETEFileOrDir = {
	fullpath: string
}

export const PUT: RequestHandler = async ({ request }) => {
	const { oldpath: oldPath, newname }: PUTRenameFileOrDir = await request.json()

	renameSync("./static/music" + oldPath, "./static/music/" + newname)

	return new Response()
}

export const DELETE: RequestHandler = async ({ request }) => {
	const { fullpath }: DELETEFileOrDir = await request.json()

	rmSync("./static/music" + fullpath, { recursive: true, force: true })

	return new Response()
}
