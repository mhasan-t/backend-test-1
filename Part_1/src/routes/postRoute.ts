import express from "express";
import { getAll, insert } from "../controllers/postController.js";
import { PostSchema } from "./validators/postSchemas.js";
import RequestValidator from "../middlewares/RequestValidator.js";
import postStorage from "../config/postStorage.js";

const router = express.Router();

router.get("/", getAll);
router.post(
	"/",
	postStorage.fields([
		{ name: "main_image", maxCount: 1 },
		{ name: "additional_images", maxCount: 5 },
	]),
	RequestValidator(PostSchema, "body"),
	insert
);

export default router;
