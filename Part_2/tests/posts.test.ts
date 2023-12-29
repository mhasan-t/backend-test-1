const fs = require("fs");
const axios = require("axios");
const Form_Data = require("form-data");

const baseURL = "http://localhost:8000";

describe("Add blog post ", () => {
	describe("With all fields", () => {
		it("Should return OK with the post", async () => {
			const post = new Form_Data();
			post.append("title", "Test post");
			post.append("description", "Test post description");
			post.append("date_time", "1212121");
			post.append(
				"main_image",
				fs.createReadStream("main_image_test.jpg")
			);

			try {
				// Need to spin up new axios instance for each test, otherwise they conflict
				const instance = axios.create({
					baseURL: baseURL,
					timeout: 1000,
				});

				const res = await instance.post("/", post);

				expect(res.status).toBe(201);
				expect(res.data.message).toBe("Post created successfully.");
				expect(res.data.data.title).toBe("Test post");
				expect(res.data.data.description).toBe("Test post description");
				expect(res.data.data.date_time).toBe(1212121);
			} catch (e) {
				console.log(e);
			}
		});
	});
	describe("With partial fields ", () => {
		it("Should return 400 with the error message", async () => {
			const post = new FormData();
			post.append("title", "Test post");
			post.append("description", "Test post description");

			try {
				const instance = axios.create({
					baseURL: baseURL,
					timeout: 1000,
				});

				const res = await instance.post("/", post);
			} catch (e) {
				expect(e.response.status).toBe(400);
				expect(e.response.data.message).toBe("Invalid request body.");
				expect(e.response.data.errors[0]).toBe(
					" must have required property 'date_time'"
				);
			}
		});
	});
	describe("With main image > 1MB ", () => {
		it("Should return 500 status", async () => {
			const post = new Form_Data();
			post.append("title", "Test post");
			post.append("description", "Test post description");
			post.append("date_time", "1212121");
			post.append(
				"main_image",
				fs.createReadStream("main_image_test_big.jpg")
			);

			// i have to manually test endpoints using axios because supertest does not work with multer
			try {
				const instance = axios.create({
					baseURL: baseURL,
					timeout: 1000,
				});

				const res = await instance.post("/", post);
			} catch (e) {
				expect(e.response.status).toBe(500);
			}
		});
	});
	describe("With special chars in the title ", () => {
		it("Should return 400 with the error message", async () => {
			const post = new FormData();
			post.append("title", "Test post@");
			post.append("description", "Test post description");

			await Promise.resolve(process.nextTick(Boolean));
			try {
				const instance = axios.create({
					baseURL: baseURL,
					timeout: 1000,
				});

				const res = await instance.post("/", post);
				console.log("RESPONSE");
				console.log(res);
			} catch (e) {
				expect(e.response.status).toBe(400);
				expect(e.response.data.message).toBe("Invalid request body.");
				expect(e.response.data.errors[1]).toBe(
					'/title must match pattern "^[a-zA-Z0-9 ]{5,50}$"'
				);
			}
		});
	}),
		describe("With all fields but ISO date_time ", () => {
			it("Should return 400 with the error message", async () => {
				const post = new FormData();
				post.append("title", "Test post");
				post.append("description", "Test post description");
				post.append("date_time", "2023-12-29T00:00:00Z");

				await Promise.resolve(process.nextTick(Boolean));
				try {
					const instance = axios.create({
						baseURL: baseURL,
						timeout: 1000,
					});

					const res = await instance.post("/", post);
					console.log("RESPONSE");
					console.log(res);
				} catch (e) {
					expect(e.response.status).toBe(400);
					expect(e.response.data.message[0]).toBe(
						"The date_time value must be in the past and it must be a number."
					);
				}
			});
		});
});
