// import { JSONFilePreset } from "lowdb/node";
import Post from "../models/Post.js";
import { JsonDB, Config } from "node-json-db";

type Data = {
	posts: Post[];
};

export async function getDbConnection() {
	// const defaultData: Data = { posts: [] };
	// const db = await JSONFilePreset<Data>("blogs.json", defaultData);

	let db = new JsonDB(new Config("blogs", true, true, "/"));
	return db;
}
