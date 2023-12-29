import { Request, Response } from "express";
import { ValidationError } from "joi";
import ListPosts from "../../application/use_cases/post/ListPosts";
import GetPost from "../../application/use_cases/post/GetPost";
import CreatePost from "../../application/use_cases/post/CreatePost";
import UpdatePost from "../../application/use_cases/post/UpdatePost";
import DeletePost from "../../application/use_cases/post/DeletePost";
import { ServiceLocator } from "../../infrastructure/config/service-locator";
import Post from "../../domain/entities/Post";

export default {
	async findPosts(request: Request, response: Response) {
		// Context
		const serviceLocator: ServiceLocator = request.serviceLocator!;

		// Treatment
		const posts = await ListPosts(serviceLocator);

		// Output
		const output = posts.map((post: Post) =>
			serviceLocator.postSerializer.serialize(post, serviceLocator)
		);
		return response.json(output);
	},

	async getPost(request: Request, response: Response) {
		// Context
		const serviceLocator: ServiceLocator = request.serviceLocator!;

		// Input
		const postId = request.params.id;

		// Treatment
		let post = null;
		try {
			post = await GetPost(postId, serviceLocator);
		} catch (err) {
			console.log(err);
		}

		// Output
		if (!post) {
			return response.status(404).json({ message: "Not Found" });
		}
		const output = serviceLocator.postSerializer.serialize(
			post,
			serviceLocator
		);
		return response.json(output);
	},

	async createPost(request: Request, response: Response) {
		// Context
		const serviceLocator: ServiceLocator = request.serviceLocator!;

		// Input
		let data = request.body;
		data = {
			content: data.content,
		};

		// Treatment
		let post = null;
		let error = null;
		try {
			post = await CreatePost(data, serviceLocator);
		} catch (err: unknown) {
			if (err instanceof ValidationError) {
				error = err.details[0].message;
			} else if (err instanceof Error) {
				// 'Error occurred while creating post'
				error = err.message;
			}
		}

		// Output
		if (!post) {
			return response.status(400).json({ message: error });
		}
		const output = serviceLocator.postSerializer.serialize(
			post,
			serviceLocator
		);
		return response.status(201).json(output);
	},

	async updatePost(request: Request, response: Response) {
		// Context
		const serviceLocator: ServiceLocator = request.serviceLocator!;

		// Input
		const postId = request.params.id;
		const inputData = request.body;
		const data: any = {
			id: postId,
		};
		const acceptedFields: string[][] = [["content"]];
		acceptedFields.forEach((acceptedField) => {
			if (inputData[acceptedField[0]] === undefined) return;
			data[
				acceptedField.length > 1 ? acceptedField[1] : acceptedField[0]
			] = inputData[acceptedField[0]];
		});

		// Treatment
		let post = null;
		let error = null;
		try {
			post = await UpdatePost(data, serviceLocator);
		} catch (err) {
			if (err instanceof ValidationError) {
				error = err.details[0].message;
			} else if (err instanceof Error) {
				// 'Error occurred while creating post'
				error = err.message;
			}
		}

		// Output
		if (!post) {
			return response.status(400).json({ message: error });
		}
		const output = serviceLocator.postSerializer.serialize(
			post,
			serviceLocator
		);
		return response.json(output);
	},

	async deletePost(request: Request, response: Response) {
		// Context
		const serviceLocator: ServiceLocator = request.serviceLocator!;

		// Input
		const toDeletePostId = request.params.id;

		// Treatment
		let post = null;
		try {
			post = await DeletePost(toDeletePostId, serviceLocator);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.log(err);
			}
		}

		// Output
		if (!post) {
			return response.status(404).json({ message: "Not Found" });
		}
		return response.sendStatus(204);
	},
};
