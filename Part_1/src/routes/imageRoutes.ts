import express from "express";
import { getToken, viewImage } from "../controllers/imageController.js";
import { TokenReq, ViewImage } from "../validators/schemas/imageSchemas.js";
import RequestValidator from "../middlewares/RequestValidator.js";

const router = express.Router();

router.get("/image", RequestValidator(TokenReq, "query"), getToken);
router.post("/image", RequestValidator(ViewImage, "body"), viewImage);

export default router;
