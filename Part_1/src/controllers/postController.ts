import { Request, Response } from "express";
import { queryAll } from "../services/postService.js";
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
	return res
		.status(201)
		.setHeader("Content-Type", "application/json")
		.json("HI");
}
