import fs from "fs";
import sharp from "sharp";

export function slugify(str: string) {
	return String(str)
		.normalize("NFKD") // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim() // trim leading or trailing whitespace
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
		.replace(/\s+/g, "_") // replace spaces with underscores
		.replace(/-+/g, "_"); // remove consecutive hyphens
}

export default async function ResizeImagesAndSave(
	file: any | undefined
): Promise<string> {
	let metadata = await sharp(file.path).metadata();

	let newHeight = 1000;
	let newWidth = 1000;
	if (metadata != undefined) {
		// if image size can not be read, then it will default to 1000 X 1000
		newHeight = Number(metadata.height) * 0.75;
		newWidth = Number(metadata.width) * 0.75;
	}

	let newFile = await sharp(file.path).resize(1024).toBuffer();
	fs.unlinkSync(file.path);
	await sharp(newFile).toFile(file.path);

	return file.filename as string;
}
