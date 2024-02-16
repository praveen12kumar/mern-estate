import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js"
import { errorMiddleware } from "./middlerwares/errorMiddleware.js";

config({
    path:"backend/config/config.env",
})

const app = express();
app.use(express.json());

app.use("/api/v1", userRouter); // user routes
app.use("/api/v1", authRouter); // auth routes

app.use(errorMiddleware);


export default app;