import Post from "../../../domain/entities/Post";
import MongoosePost from "../../orm/mongoose/schemas/Post";
import PostRepository from "../../../domain/repositories/PostRepository";
import PostSTO from "../../stos/mongoose/PostSTO";
import { ID } from "../../../domain/entities/Entity";

export default class PostRepositoryMongo implements PostRepository {
	async persist(domainEntity: Post): Promise<Post | null> {
		const { content } = domainEntity;
		const mongoosePost = new MongoosePost({
			content,
		});
		await mongoosePost.save();
		return PostSTO(mongoosePost);
	}

	async merge(domainEntity: Post): Promise<Post | null> {
		const { id, content } = domainEntity;
		const mongoosePost = await MongoosePost.findByIdAndUpdate(
			id,
			{
				content,
			},
			{
				new: true,
			}
		);
		return PostSTO(mongoosePost);
	}

	async remove(entityId: ID): Promise<boolean | null> {
		return MongoosePost.findOneAndDelete({ _id: entityId });
	}

	async get(entityId: ID): Promise<Post | null> {
		const mongoosePost = await MongoosePost.findById(entityId);
		if (!mongoosePost) return null;
		return PostSTO(mongoosePost);
	}

	async getByEmail(email: string): Promise<Post | null> {
		const mongoosePost = await MongoosePost.findOne({ email });
		if (!mongoosePost) return null;
		return PostSTO(mongoosePost);
	}

	async find(): Promise<Post[]> {
		const mongoosePosts = await MongoosePost.find().sort({ createdAt: -1 });
		return mongoosePosts
			.map((mongoosePost) => PostSTO(mongoosePost))
			.filter((Post: Post | null): Post is Post => Post != null);
	}

	async removeManyByIds(ids: ID[]): Promise<boolean | null> {
		try {
			// MongoosePost.deleteMany({ _id: { $in: ids } }); // does not work for some reason
			ids.map(async (id) => {
				await MongoosePost.remove({ _id: id });
			});
			return true;
		} catch {
			return false;
		}
	}
}
