import { ID } from "../entities/Entity";
import User_Post from "../entities/User_Post";

export default interface PostRepository {
	persist(domainEntity: User_Post): Promise<User_Post | null>;

	merge(domainEntity: User_Post): Promise<User_Post | null>;

	remove(entityId: ID): Promise<boolean | null>;

	get(entityId: ID): Promise<User_Post | null>;

	findByUserId(userId: ID): Promise<User_Post[]>;

	findByPostId(postId: ID): Promise<User_Post[]>;

	find(): Promise<User_Post[]>;
}
