import User_Post from "../../../domain/entities/User_Post";
import MongooseUser_Post from "../../orm/mongoose/schemas/User_Post";
import User_PostRepository from "../../../domain/repositories/User_PostRepository";
import User_PostSTO from "../../stos/mongoose/User_PostSTO";
import { ID } from "../../../domain/entities/Entity";

export default class User_PostRepositoryMongo implements User_PostRepository {
	async persist(domainEntity: User_Post): Promise<User_Post | null> {
		const { userId, postId } = domainEntity;
		const mongooseUser_Post = new MongooseUser_Post({
			userId,
			postId,
		});
		await mongooseUser_Post.save();
		return User_PostSTO(mongooseUser_Post);
	}

	async merge(domainEntity: User_Post): Promise<User_Post | null> {
		const { id, userId, postId } = domainEntity;
		const mongooseUser_Post = await MongooseUser_Post.findByIdAndUpdate(
			id,
			{
				userId,
				postId,
			},
			{
				new: true,
			}
		);
		return User_PostSTO(mongooseUser_Post);
	}

	async remove(entityId: ID): Promise<boolean | null> {
		return MongooseUser_Post.findOneAndDelete({ _id: entityId });
	}

	async get(entityId: ID): Promise<User_Post | null> {
		const mongooseUser_Post = await MongooseUser_Post.findById(entityId);
		if (!mongooseUser_Post) return null;
		return User_PostSTO(mongooseUser_Post);
	}

	async find(): Promise<User_Post[]> {
		const mongooseUser_Posts = await MongooseUser_Post.find().sort({
			createdAt: -1,
		});
		return mongooseUser_Posts
			.map((mongooseUser_Post) => User_PostSTO(mongooseUser_Post))
			.filter(
				(User_Post: User_Post | null): User_Post is User_Post =>
					User_Post != null
			);
	}

	async getByUserId(userId: ID): Promise<User_Post[]> {
		const mongooseUser_Posts = await MongooseUser_Post.find()
			.where("user_id")
			.equals(userId)
			.sort({
				createdAt: -1,
			});
		return mongooseUser_Posts
			.map((mongooseUser_Post) => User_PostSTO(mongooseUser_Post))
			.filter(
				(User_Post: User_Post | null): User_Post is User_Post =>
					User_Post != null
			);
	}

	async getByPostId(postId: ID): Promise<User_Post[]> {
		const mongooseUser_Posts = await MongooseUser_Post.find()
			.where("post_id")
			.equals(postId)
			.sort({
				createdAt: -1,
			});
		return mongooseUser_Posts
			.map((mongooseUser_Post) => User_PostSTO(mongooseUser_Post))
			.filter(
				(User_Post: User_Post | null): User_Post is User_Post =>
					User_Post != null
			);
	}
}
