import { ID } from "../../../domain/entities/Entity";
import { ServiceLocator } from "../../../infrastructure/config/service-locator";

export default async ({ userPostRepository }: ServiceLocator, userId: ID) =>
	userPostRepository!.findByUserId(userId);
