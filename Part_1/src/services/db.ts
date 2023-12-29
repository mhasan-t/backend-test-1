import Post from "../models/Post.js";
import { JsonDB, Config } from "node-json-db";

type Data = {
	posts: Post[];
};

export async function getDbConnection() {
	let db = new JsonDB(new Config("blogs", true, true, "/"));
	return db;
}
