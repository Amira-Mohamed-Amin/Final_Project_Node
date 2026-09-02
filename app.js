import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth.routes.js";
import commentRouter from "./routes/comment.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", commentRouter);

export default app;