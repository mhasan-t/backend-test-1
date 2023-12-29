import { ID } from "../../../domain/entities/Entity";
import { ServiceLocator } from "../../../infrastructure/config/service-locator";

export default (postId: ID, { userPostRepository }: ServiceLocator) =>
	userPostRepository!.removeAllByUserId(postId);
