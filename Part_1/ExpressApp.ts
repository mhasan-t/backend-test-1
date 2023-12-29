import cors from "cors";
import express, { Request, Response } from "express";
import JsonOrFormData from "./src/middlewares/JsonOrFormdata.js";
import dotenv from "dotenv";

import PostRouter from "./src/routes/postRoute.js";
import ImageRouter from "./src/routes/imageRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use((req: Request, res: Response, next) => {
	console.log(req.url);
	next();
});
app.use(JsonOrFormData);

// ROUTERS
app.use(PostRouter);
app.use(ImageRouter);

export default app;
