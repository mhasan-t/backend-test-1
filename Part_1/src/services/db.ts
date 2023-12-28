import { JSONFilePreset } from "lowdb/node";
import Post from "../models/Post.js";

type Data = {
	posts: Post[];
};

export async function getDbConnection() {
	const defaultData: Data = { posts: [] };
	const db = await JSONFilePreset<Data>("blogs.json", defaultData);
	return db;
}
