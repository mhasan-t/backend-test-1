import fs from "fs";
import jwt from "jsonwebtoken";
import { JsonResponse } from "../types";
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
export async function viewImage(req: Request, res: Response) {
	try {
		const decoded: any = jwt.verify(
			req.body.token,
			process.env.TOKEN_SECRET as string
		);

		if (decoded.image_path != req.body.path) {
			return res.status(400).json({ message: "Token mismatch." });
		}

		// check if file exists
		if (!fs.existsSync(decoded.image_path)) {
			return res
				.status(400)
				.json({ message: "Request resource does not exist." });
		}

		const file = fs.readFileSync(decoded.image_path);
		res.contentType("image/jpeg");
		res.send(file);
		return;
	} catch (err) {
		return res
			.status(401)
			.json({ message: "Unauthorized. Expired or malformed token." });
	}
}
