export const TokenReq = {
	type: "object",
	properties: {
		image_path: {
			type: "string",
		},
	},
	required: ["image_path"],
	additionalProperties: false,
};

export const ViewImage = {
	type: "object",
	properties: {
		image_path: {
			type: "string",
		},
		token: {
			type: "string",
		},
	},
	required: ["image_path", "token"],
	additionalProperties: false,
};
