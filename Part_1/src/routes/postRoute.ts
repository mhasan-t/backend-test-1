import express from "express";
import { getAll, insert } from "../controllers/postController";

const router = express.Router();

router.get("/", getAll);
router.post("/", insert);

export default router;
