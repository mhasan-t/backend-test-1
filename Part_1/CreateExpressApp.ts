import cors from "cors";
import express, { Request, Response } from "express";
import JsonOrFormData from "./src/middlewares/JsonOrFormdata";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use((req: Request, res: Response, next) => {
	console.log(req.url);
	next();
});

app.use(JsonOrFormData);

export default app;
