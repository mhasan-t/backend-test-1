import express from "express";
import { getToken, viewImage } from "../controllers/imageController";
import { TokenReq, ViewImage } from "../validators/schemas/imageSchemas";
import RequestValidator from "../middlewares/RequestValidator";

const router = express.Router();

router.get("/image", RequestValidator(TokenReq, "query"), getToken);
router.post("/image", RequestValidator(ViewImage, "body"), viewImage);

export default router;
