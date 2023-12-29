import { Request } from "express";
export function validateInsert(req: Request): {
	isValid: boolean;
	messages?: string[];
} {
	let messages: string[] = [];

	// validate time
	req.body.date_time = Number(req.body.date_time);
	if (
		Number.isNaN(req.body.date_time) ||
		req.body.date_time > new Date().getTime()
	) {
		messages.push(
			"The date_time value must be in the past and it must be a number."
		);
	}

	// validate main image
	let files = req.files as any;
	if (!files || !files.main_image || files.main_image.length == 0) {
		messages.push("You must upload a main_image.");
	}

	return {
		isValid: messages.length == 0,
		messages: messages,
	};
}
