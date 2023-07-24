import { renameSync, unlinkSync } from "fs";
import type { RequestHandler } from "./$types";

export const PUT: RequestHandler = async ({ request }) => {
	const { oldname, newname, extension } = await request.json()
	console.log(oldname, newname + extension)

	renameSync("./static/music/" + oldname, "./static/music/" + newname + extension)

	return new Response()
}

export const DELETE: RequestHandler = async ({ request }) => {
	const { filename } = await request.json()

	unlinkSync("./static/music/" + filename)

	return new Response()
}
