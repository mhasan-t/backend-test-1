import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
	console.log("ALL POSTS");
	return res.status(200).json("ALL POSTS");
}

export async function insert(req: Request, res: Response) {
	console.log("NEW POST ADDED");
	return res.status(200).json("New post");
}
