import { ID } from "../../../domain/entities/Entity";
import { ServiceLocator } from "../../../infrastructure/config/service-locator";

export default (ids: ID[], { userPostRepository }: ServiceLocator) =>
	userPostRepository!.removeManyByIds(ids);
