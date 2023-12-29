import supertest from "supertest";
import app from "../../Part_1/ExpressApp";
import fs from "fs";

describe("Add blog post ", () => {
	describe("With all fields", () => {
		it("Should return OK with the post", async () => {
			const mainImgBuff = fs.readFileSync("main_image_test.jpg");
			let mainImgBlob = new Blob([mainImgBuff]);

			const post = new FormData();
			post.append("title", "Test post");
			post.append("description", "Test post description");
			post.append("date_time", "1212121");
			post.append("main_image", mainImgBlob, "main_image");

			await supertest(app)
				.post("/")
				.set("Content-type", "multpart/formdata")
				.send(post)
				.expect(201);
		});
	});
	// describe("With partial fields ", ()=>{}),
	// describe("With main image > 1MB ", ()=>{}),
	// describe("With special chars in the title ", ()=>{}),
	// describe("With all fields but ISO date_time ", ()=>{}),
	// describe("With partial fields ", ()=>{}),
	// describe("With partial fields ", ()=>{}),
	// describe("With partial fields ", ()=>{}),
});
