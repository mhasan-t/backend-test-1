import { Request, Response } from "express";
import { queryAll, queryInsert } from "../services/postService.js";
import Post from "../models/Post.js";

type JsonResponse<T> = {
	message: string;
	data?: T;
};

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

export async function insert(req: Request, res: Response) {
	// validate time
	if (req.body.date_time > new Date().getTime()) {
		return res
			.status(400)
			.setHeader("Content-Type", "application/json")
			.json({
				message: "The date_time value must be in the past.",
			});
	}

	let newRef;
	try {
		newRef = await queryInsert(req.body);
	} catch (e) {
		return res
			.status(500)
			.setHeader("Content-Type", "application/json")
			.json({
				message: "Something went wrong.",
			});
	}

	const result: JsonResponse<{ id: string }> = {
		message: "Post created successfully.",
		data: { id: newRef },
	};

	return res
		.status(201)
		.setHeader("Content-Type", "application/json")
		.json(result);
}
