import { ID } from "../../../domain/entities/Entity";
import { ServiceLocator } from "../../../infrastructure/config/service-locator";

export default (userId: ID, { userPostRepository }: ServiceLocator) =>
	userPostRepository!.removeAllByUserId(userId);
