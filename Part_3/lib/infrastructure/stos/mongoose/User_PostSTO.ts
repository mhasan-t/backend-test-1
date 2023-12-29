import User_Post from "../../../domain/entities/User_Post";

export default (schemaEntity: any): User_Post | null => {
	if (!schemaEntity) return null;
	return new User_Post({
		id: schemaEntity.id,
		postId: schemaEntity.postId,
		userId: schemaEntity.userId,
	});
};
