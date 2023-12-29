import Post from "../models/Post";
import { getDbConnection } from "./db";
import { slugify } from "../utils";

export async function queryAll() {
	const db = await getDbConnection();
	let posts = await db.getData("/posts");

	// add title slug and ISO datetime string in O(N) time complexity
	for (let i = 0; i < posts.length; i++) {
		posts[i].title_slug = slugify(posts[0].title);
		posts[i].date_time_iso = new Date(posts[i].date_time).toISOString();
	}

	return posts;
}

export async function queryInsert(post: Post) {
	const db = await getDbConnection();

	let posts = await db.getData("/posts");
	const latestPost = posts[posts.length - 1];
	let newRef = String(Number(latestPost.reference) + 1);

	// APPEND ZEROES TO MAKE IT AT LEAST OF LEN 5
	if (newRef.length < 5) {
		const zeroes = "0".repeat(5 - newRef.length);
		newRef = zeroes + newRef;
	}
	post.reference = String(newRef);

	await db.push("/posts", [post], false);

	return post;
}
