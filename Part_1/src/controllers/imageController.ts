import jwt from "jsonwebtoken";
import { JsonResponse } from "../types.js";
import { Request, Response } from "express";

export async function getToken(req: Request, res: Response) {
	const payload = {
		image_path: req.query.path,
	};
	let token = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
		expiresIn: "5m",
	});

	const result: JsonResponse<{ token: string }> = {
		message: "Token generation successful.",
		data: {
			token: token,
		},
	};
	return res.status(200).json(result);
}
export async function viewImage(req: Request, res: Response) {}
