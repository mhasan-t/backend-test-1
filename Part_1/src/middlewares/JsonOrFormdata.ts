import express, { NextFunction, Request, Response } from "express";

export default function JsonOrFormData(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.method == "GET" || req.method == "DELETE") {
		next();
		return;
	}

	if (req.headers["content-type"] == "application/json") {
		return express.json()(req, res, next);
	} else if (req.headers["content-type"]?.includes("multipart/form-data")) {
		next();
		return;
	} else {
		return res.status(400).json({
			message: "Invalid content-type header.",
		});
	}
}
