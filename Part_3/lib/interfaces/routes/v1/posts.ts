import { Router } from "express";
import PostController from "../../controllers/PostController";

import AuthenticationMiddleware from "../../middlewares/AuthenticationMiddleware";

const router = Router();

router.get("/", PostController.findPosts);
router.get("/:id", PostController.getPost);
router.post("/", AuthenticationMiddleware(), PostController.createPost);
router.patch("/:id", AuthenticationMiddleware(), PostController.updatePost);
router.delete("/:id", AuthenticationMiddleware(), PostController.deletePost);

export default router;
