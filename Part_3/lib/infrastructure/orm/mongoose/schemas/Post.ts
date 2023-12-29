import mongoose from "../mongoose";

const schema = new mongoose.Schema(
	{
		content: String,
	},
	{ timestamps: true }
);

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export default mongoose.model("Post", schema);
