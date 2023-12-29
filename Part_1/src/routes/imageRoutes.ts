import express from "express";
import { getToken, viewImage } from "../controllers/imageController.js";
import { TokenReq } from "../validators/schemas/imageSchemas.js";
import RequestValidator from "../middlewares/RequestValidator.js";

const router = express.Router();

router.get("/image", RequestValidator(TokenReq, "query"), getToken);
router.post("/image", viewImage);

export default router;
