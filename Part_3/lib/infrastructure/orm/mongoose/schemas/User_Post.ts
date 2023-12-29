import mongoose from "../mongoose";

const schema = new mongoose.Schema(
	{
		userId: String,
		postId: String,
	},
	{ timestamps: true }
);

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export default mongoose.model("User_Post", schema);
