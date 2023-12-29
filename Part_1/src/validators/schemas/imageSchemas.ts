export const TokenReq = {
	type: "object",
	properties: {
		path: {
			type: "string",
		},
	},
	required: ["path"],
	additionalProperties: false,
};

export const ViewImage = {
	type: "object",
	properties: {
		path: {
			type: "string",
		},
		token: {
			type: "string",
		},
	},
	required: ["path", "token"],
	additionalProperties: false,
};
