import Post from "../../../domain/entities/Post";
import PostValidator from "../../../domain/validators/PostValidator";
import { ServiceLocator } from "../../../infrastructure/config/service-locator";

export default async (postData: any, { postRepository }: ServiceLocator) => {
	await PostValidator.tailor("create").validateAsync(postData);
	const post = new Post({
		content: postData.content,
	});
	return postRepository!.persist(post);
};
