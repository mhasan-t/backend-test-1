import { ID } from "../../../domain/entities/Entity";
import { ServiceLocator } from "../../../infrastructure/config/service-locator";

export default async (postId: ID, { postRepository }: ServiceLocator) => {
	const post = await postRepository!.get(postId);
	if (!post) {
		throw new Error("Invalid Post");
	}
	return post;
};
