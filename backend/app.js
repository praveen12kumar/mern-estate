import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import listRouter from  "./routes/list.router.js";

import { errorMiddleware } from "./middlerwares/errorMiddleware.js";
import cookieParser from "cookie-parser";

config({
    path:"backend/config/config.env",
})

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user", userRouter); // user routes
app.use("/api/v1/auth", authRouter); // auth routes
app.use("/api/v1/listing", listRouter); // list routes


app.use(errorMiddleware);


export default app;