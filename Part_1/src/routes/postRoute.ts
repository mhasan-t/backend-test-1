import express from "express";
import { getAll, insert } from "../controllers/postController";
import { PostSchema } from "../validators/schemas/postSchemas";
import RequestValidator from "../middlewares/RequestValidator";
import postStorage from "../config/postStorage";

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
