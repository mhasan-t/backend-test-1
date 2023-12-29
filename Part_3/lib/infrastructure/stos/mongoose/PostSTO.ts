import Post from "../../../domain/entities/Post";

export default (schemaEntity: any): Post | null => {
	if (!schemaEntity) return null;
	return new Post({
		id: schemaEntity.id,
		content: schemaEntity.content,
	});
};
