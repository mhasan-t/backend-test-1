import { NextFunction, Response, Request } from "express";

import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
	allErrors: true,
	strict: true,
});
addFormats(ajv);

export default function RequestValidator(
	schema: Object,
	dataSource: "body" | "query"
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		let valid: boolean = false;
		let data = dataSource == "body" ? req.body : req.query;

		try {
			valid = ajv.validate(schema, data);
		} catch (err) {
			return res.status(500).json({ message: "Internal Server Error" });
		}
		if (!valid) {
			let errors = ajv.errors;
			let errMessages: (string | undefined)[] = [];
			if (errors) {
				errMessages = errors.map((error) => {
					return error.instancePath + " " + error.message;
				});
			}
			return res.status(400).json({
				message: "Invalid request body.",
				errors: errMessages,
			});
		}
		next();
	};
}
