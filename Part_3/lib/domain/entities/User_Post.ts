import Entity, { ID } from "./Entity";

export default class User extends Entity {
	userId: string;
	postId: string;

	constructor({
		id,
		userId,
		postId,
	}: {
		id?: ID;
		userId: string;
		postId: string;
	}) {
		super({ id });
		this.userId = userId;
		this.postId = postId;
	}
}
