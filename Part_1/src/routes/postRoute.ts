import express from "express";
import { getAll, insert } from "../controllers/postController.js";
import { PostSchema } from "./validators/postSchemas.js";
import RequestValidator from "../middlewares/RequestValidator.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", RequestValidator(PostSchema, "body"), insert);

export default router;
