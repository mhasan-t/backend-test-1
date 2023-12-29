import User_Post from "../../domain/entities/User_Post";
import { ServiceLocator } from "../../infrastructure/config/service-locator";
import Serializer from "./Serializer";

export default class User_PostSerializer extends Serializer {
	_serializeSingleEntity(
		entity: User_Post,
		serviceLocator: ServiceLocator
	): object {
		const userPostObj = {
			id: entity.id,
			user_id: entity.userId,
			post_id: entity.postId,
		};
		return userPostObj;
	}
}
