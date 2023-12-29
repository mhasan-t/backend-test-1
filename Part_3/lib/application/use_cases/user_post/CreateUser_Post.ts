import User_Post from "../../../domain/entities/User_Post";
import User_PostValidator from "../../../domain/validators/User_PostValidator";
import { ServiceLocator } from "../../../infrastructure/config/service-locator";

export default async (
	userPostData: any,
	{ userPostRepository }: ServiceLocator
) => {
	await User_PostValidator.tailor("create").validateAsync(userPostData);
	const userPost = new User_Post({
		userId: userPostData.userId,
		postId: userPostData.postId,
	});
	return userPostRepository!.persist(userPost);
};
