import Post from "../models/Post.js";
import { getDbConnection } from "./db.js";

export async function queryAll() {
	const db = await getDbConnection();
	await db.read();
	return db.data.posts;
}
