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
