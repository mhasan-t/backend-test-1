export const PostSchema = {
	type: "object",
	properties: {
		title: {
			type: "string",
			pattern: "^[a-zA-Z0-9 ]{5,50}$", // regexp for only accepting alphaneumeric characters and reject all speacial chars
		},
		description: {
			type: "string",
			maxLength: 500,
		},
		date_time: {
			type: "number",
		},
	},
	required: ["title", "description", "date_time"],
	additionalProperties: false,
};
