import fs from "fs";
import axios from "axios";
import Form_Data from "form-data";

// Need custom fail function, because of bug in Jest
// https://github.com/jestjs/jest/issues/11698
function fail(reason = "fail was called in a test.") {
	throw new Error(reason);
}

const baseURL = "http://localhost:8000";
// have to rename the above variables to fix buggy typescript errors

describe("Upload and get image", () => {
	describe("With correct payload", () => {
		it("Should be successfull", async () => {
			const image_path = "images/main_image_1_test.jpg";

			// get the token
			const payload = {
				image_path: image_path,
			};
			let token;
			try {
				// Need to spin up new axios instance for each test, otherwise they conflict
				const instance = axios.create({
					baseURL: baseURL,
					timeout: 1000,
				});

				const res = await instance.get("/image", { params: payload });

				// console.log(res);
				expect(res.status).toBe(200);
				expect(res.data.message).toBe("Token generation successful.");
				expect(res.data.data.token).toBeDefined();
				token = res.data.data.token;
			} catch (e: any) {
				console.log(e);
				fail("it should not throw exceptions.");
			}

			// get the image
			const viewPayload = {
				image_path: image_path,
				token: token,
			};
			try {
				// Need to spin up new axios instance for each test, otherwise they conflict
				const instance = axios.create({
					baseURL: baseURL,
					timeout: 1000,
				});
				const res = await instance.post("/image", viewPayload);

				expect(res.status).toBe(200);
				expect(res.headers["content-type"]).toBe("image/jpeg");
			} catch (e: any) {
				console.log(e);
				fail("it should not throw exceptions.");
			}
		});
	});
	describe("With incorrect payload", () => {
		it("Should fail", async () => {
			const image_path = "images/main_image_1_test.jpg";

			// get the token
			const payload = {
				image_path: image_path,
			};
			let token;
			try {
				// Need to spin up new axios instance for each test, otherwise they conflict
				const instance = axios.create({
					baseURL: baseURL,
					timeout: 1000,
				});

				const res = await instance.get("/image", { params: payload });

				// console.log(res);
				expect(res.status).toBe(200);
				expect(res.data.message).toBe("Token generation successful.");
				expect(res.data.data.token).toBeDefined();
				token = res.data.data.token;
			} catch (e: any) {
				console.log(e);
				fail("it should not throw exceptions.");
			}

			// get the image with incorrect name
			const viewPayload = {
				image_path: "image/different_image.jpg",
				token: token,
			};
			try {
				// Need to spin up new axios instance for each test, otherwise they conflict
				const instance = axios.create({
					baseURL: baseURL,
					timeout: 1000,
				});
				const res = await instance.post("/image", viewPayload);
				fail("it should throw exceptions.");
			} catch (e: any) {
				expect(e.response.status).toBe(400);
				expect(e.response.data.message).toBe("Token mismatch.");
			}
		});
	});
});
