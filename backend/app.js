import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import listRouter from  "./routes/list.router.js";
import { errorMiddleware } from "./middlerwares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";


config({
    path:"backend/config/config.env",
})


const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user", userRouter); // user routes
app.use("/api/v1/auth", authRouter); // auth routes
app.use("/api/v1/listing", listRouter); // list routes


app.use(errorMiddleware);


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

export default app;