import { Request, Response } from "express";
import { queryAll, queryInsert } from "../services/postService.js";
import Post from "../models/Post.js";
import { validateInsert } from "../validators/functions/postValidators.js";
import { ResizeImagesAndSave } from "../utils.js";

type JsonResponse<T> = {
	message: string;
	data?: T;
};

// GET ALL POSTS
export async function getAll(req: Request, res: Response) {
	const allPosts = await queryAll();
	let message, data;

	if (allPosts == undefined) {
		message = "Data not found.";
	} else {
		message = "Fetched Successfully.";
	}

	const result: JsonResponse<Post[]> = {
		message: message,
		data: allPosts,
	};

	return res
		.status(200)
		.setHeader("Content-Type", "application/json")
		.json(result);
}

// CREATE NEW POST
export async function insert(req: Request, res: Response) {
	// most of the time, ajv will take care of json validation, but in case of files or special case like timestamp, we need to do it manually like below
	const valid = validateInsert(req);
	if (!valid.isValid) {
		return res
			.status(400)
			.setHeader("Content-Type", "application/json")
			.json({
				message: valid.messages,
			});
	}

	// compress images
	const files = req.files as any;
	const mainImageFileName = await ResizeImagesAndSave(files.main_image);
	req.body.main_image = mainImageFileName;

	// insertion
	let newPost;
	try {
		newPost = await queryInsert(req.body);
	} catch (e) {
		return res
			.status(500)
			.setHeader("Content-Type", "application/json")
			.json({
				message: "Something went wrong.",
			});
	}

	// return result
	const result: JsonResponse<Post> = {
		message: "Post created successfully.",
		data: newPost,
	};

	return res
		.status(201)
		.setHeader("Content-Type", "application/json")
		.json(result);
}
