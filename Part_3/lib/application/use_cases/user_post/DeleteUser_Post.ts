import { ID } from "../../../domain/entities/Entity";
import { ServiceLocator } from "../../../infrastructure/config/service-locator";

export default (userPostId: ID, { userPostRepository }: ServiceLocator) =>
	userPostRepository!.remove(userPostId);
