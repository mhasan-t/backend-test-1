import Entity, { ID } from "./Entity";

export default class User extends Entity {
	content: string;

	constructor({ id, content }: { id?: ID; content: string }) {
		super({ id });
		this.content = content;
	}
}
